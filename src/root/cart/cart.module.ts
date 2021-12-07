import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';
import { CartItemsRepository } from './cartItems.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartRepository,CartItemsRepository], 'market'),
    ProductsModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
