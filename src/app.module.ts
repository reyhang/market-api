import { Module } from '@nestjs/common';
import { database } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './root/users/users.module';
import { ProductsModule } from './root/products/products.module';
import { CartModule } from './root/cart/cart.module';

@Module({
  imports: [
    ...database,
    UsersModule,
    ProductsModule,
    CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
