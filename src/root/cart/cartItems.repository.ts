import { EntityRepository, Repository } from "typeorm";
import { CartItemsEntity } from "./cartItems.entity";




@EntityRepository(CartItemsEntity)
export class CartItemsRepository extends Repository<CartItemsEntity>{}