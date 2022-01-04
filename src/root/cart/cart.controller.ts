import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { addCartDto } from './dto/addCartDto.dto';
import { addCartItemDto } from './dto/addCartItemDto.dto';
addCartItemDto
@Controller('cart')
export class CartController {
  constructor(private CartService: CartService) {}

  @Get()
  getCart(
      @Query() data: addCartDto,
    ){
    return this.CartService.getCart(data);
  }

  @Post()
  addCart(
    @Query() data:addCartDto) {
    return this.CartService.addCart(data).then((res) => ({
      message: `${data.memberId}nin sepeti oluşturuldu. `,
    }));
  }

  @Post('/items/:id')
  addCartItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: addCartItemDto,
  ) {
    console.log(data,id)
    return this.CartService.addCartItems(id, data).then((res) => ({
      message: 'Eklendi',
    }));
  }

  @Post("/increment/:id")
  incrementProduct(
    @Param("id", ParseIntPipe) id:number, 
  ){
    return this.CartService.incDecProduct(id,true).then((res)=>({
      message:"increment"
    }))
  }

  @Post("/decrement/:id")
  decrementProduct(
    @Param("id", ParseIntPipe) id:number, 
  ){
    return this.CartService.incDecProduct(id,false).then((res)=>({
      message:"decrement"
    }))
  }

  @Put('/:id')
  updateCartStatus(@Param('id', ParseIntPipe) id: number) {
    return this.CartService.updateCartStatus(id)
      .then((res) => ({ message: 'Status güncellendi.' }))
      .catch((e) => {
        throw new InternalServerErrorException(e.message || e);
      });
  }

  @Delete("items/:id")
  deleteCartItems(
    @Param("id",ParseIntPipe) id:number) {
      return this.CartService.deleteCartItems(id)
      .then((res) => ({message: "Silme işlemi başarıyla tamamlandı."}))
      .catch((e) => {
        throw new InternalServerErrorException(e.message || e)
      })
    } 

}
