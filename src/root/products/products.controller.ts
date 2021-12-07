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
import { addProductDto } from './dto/addProductDto.dto';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProduct(id);
  }

  @Post()
  addProduct(@Body() data: addProductDto) {
    const newData = data.toEntity();
    return this.productsService.addProduct(newData).then((res) => ({
      message: `${data}`,
    }));
  }

  @Put('/:id')
  updateProduct(
    @Body() data: addProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.updateProduct(data, id);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService
      .deleteProduct(id)
      .then((res) => ({ message: 'Silme işlemi başarıyla tamamlandı.' }))
      .catch((e) => {
        throw new InternalServerErrorException(e.message || e);
      });
  }
}
