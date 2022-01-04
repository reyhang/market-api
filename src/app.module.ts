import { Module } from '@nestjs/common';
import { database } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './root/users/users.module';
import { ProductsModule } from './root/products/products.module';
import { CartModule } from './root/cart/cart.module';
import { AuthModule } from './root/auth/auth.module';
import { AdminRepoModule } from './root/admin-repo/admin-repo.module';

@Module({
  imports: [
    ...database,
    UsersModule,
    ProductsModule,
    CartModule,
    AuthModule,
    AdminRepoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
