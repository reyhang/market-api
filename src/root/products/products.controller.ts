import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import * as jwt from 'jsonwebtoken';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getProductById(id);
  }

  @Get("/barcode/:id")
  getProductByBarcode(
    @Param("id") id:string) {
    return this.productsService.getProductByBarcode(id)
  }
  

  @Post()
  addProduct(@Body() data: addProductDto) {;
    /* const tokenOptions = {
      secretKey: 'r22a01m28iG12yH23JsF9hS',
      
    };
    const verif = jwt.verify(
      data.token,
      tokenOptions.secretKey,
      (err, user) => {
        if (err) {
          throw new ForbiddenException(err);
        } else {
          return user;
        }
      },
    ); */
    
    return this.productsService.addProduct(data).then((res) => ({
      message: `${data.title} ürünü eklenmiştir.`,
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
