import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { addCartDto } from './dto/addCartDto.dto';
import { addCartItemDto } from './dto/addCartItemDto.dto';

@Controller('cart')
export class CartController {
  constructor(private CartService: CartService) {}

  @Get()
  getCart(@Body() data: addCartDto) {
    return this.CartService.getCart(data);
  }

  @Post()
  addCart(@Body() data: addCartDto) {
    return this.CartService.addCart(data).then((res) => ({
      message: 'Eklendi',
    }));
  }

  @Post('/:id')
  addCartItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: addCartItemDto,
  ) {
    return this.CartService.addCartItems(id, data).then((res) => ({
      message: 'Eklendi',
    }));
  }

  @Delete('/:id')
  deleteCart(@Param('id', ParseIntPipe) id: number) {
    return this.CartService.deleteCart(id)
      .then((res) => ({ message: 'Silme işlemi başarıyla tamamlandı.' }))
      .catch((e) => {
        throw new InternalServerErrorException(e.message || e);
      });
  }
}
