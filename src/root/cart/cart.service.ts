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
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select(['cart.id'])
      .innerJoin('cart.memberId', 'member')
      .where('member.id = :id', { id: data.memberId })
      .andWhere('cart.status = 1')
      .getOne();
  }

  async addCart(data: addCartDto) {
    return this.cartRepository.insert({
      memberId: { id: data.memberId },
    });
  }

  async addCartItems(id: number, data: addCartItemDto) {
    const getProduct = await this.productsService.getProductByBarcode(
      data.barcode,
    );
    if (!getProduct)
      throw new InternalServerErrorException('Aradığınız ürün bulunamadı.');
    const checkCart = await this.cartItemsRepository.findOne({
      where: { cartId: { id } },
    });
    if (checkCart) {
      checkCart.count = checkCart.count + 1;
      return await this.cartItemsRepository.update(
        { cartId: { id } },
        checkCart,
      );
    } else {
      return await this.cartItemsRepository.insert({
        productId: getProduct,
        cartId: { id },
        count: 1,
      });
    }
  }
  async updateCartStatus(id:number) {

    return await this.cartRepository.update({id},{status:0})

  }

  async deleteCartItems(id:number) {

    return await this.cartItemsRepository.delete(id)

  }


  }
