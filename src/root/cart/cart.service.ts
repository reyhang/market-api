import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { CartRepository } from './cart.repository';
import { CartItemsRepository } from './cartItems.repository';
import { addCartDto } from './dto/addCartDto.dto';
import { addCartItemDto } from './dto/addCartItemDto.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository, 'market')
    private cartRepository: CartRepository,
    @InjectRepository(CartItemsRepository, 'market')
    private cartItemsRepository: CartItemsRepository,
    private productsService: ProductsService,
  ) {}

  async getCart(data: addCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { memberId: data.memberId, status: 1 },
      select: ['id', 'status'],
    });
    if (!cart) {
      return null;
    }

    const getItems = await this.cartItemsRepository.findAndCount({
      where: { cartId: cart.id },
      select: ['count', 'id'],
      relations: ['productId'],
    });
    console.log(getItems[0][0].productId.price);

    let priceArr = getItems[0].map((res) => res.productId.price);
    const price = priceArr.reduce((a, b) => a + b, 0);
    return {
      ...cart,
      items: getItems[0],
      itemCount: getItems[1],
      itemPrice: price,
    };
  }

  async addCart(data: addCartDto) {
    const cart = await this.cartRepository.findOne({
      where: { memberId: data.memberId, status: 1 },
      select: ['id', 'status'],
    });
    if (!cart) {
      await this.cartRepository.insert({
        memberId: { id: data.memberId },
      });
      return { message: 'Sepetiniz Oluşturuldu.' };
    } else {
      return { message: 'Sepetiniz daha önceden oluşturulmuş.' };
    }
  }

  async addCartItems(id: number, data: addCartItemDto) {
    const getProduct = await this.productsService.getProductByBarcode(
      data.barcode,
    );
    if (!getProduct)
      throw new InternalServerErrorException('Aradığınız ürün bulunamadı.');
    const checkCart = await this.cartItemsRepository.findOne({
      where: { cartId: { id: id }, productId: getProduct },
    });
    if (checkCart) {
      checkCart.count = checkCart.count + 1;
      return await this.cartItemsRepository.update(
        { cartId: { id }, productId: getProduct },
        checkCart,
      );
    } else {
      return await this.cartItemsRepository.insert({
        productId: getProduct,
        cartId: { id: id },
        count: 1,
      });
    }
  }

  async incDecProduct(id: number, status: boolean) {
    const getProduct = await this.cartItemsRepository.findOne(id);

    if (!getProduct) {
      throw new InternalServerErrorException('Ürün yok.');
    }

    if (status) {
      if (getProduct) {
        return await this.cartItemsRepository.update(
          { id },

          { count: getProduct.count + 1 },
        );
      }
    } else {
      if (getProduct.count === 1) {
        return await this.cartItemsRepository.delete({ id });
      }

      return await this.cartItemsRepository.update(
        { id },

        { count: getProduct.count - 1 },
      );
    }
  }

  async addToCart() {}

  async updateCartStatus(id: number) {
    return await this.cartRepository.update({ id }, { status: 0 });
  }

  async deleteCartItems(id: number) {
    return await this.cartItemsRepository.delete(id);
  }
}
