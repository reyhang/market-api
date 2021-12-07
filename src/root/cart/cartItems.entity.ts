import { BaseEntity, Column, Entity, JoinColumn,  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductsEntity } from "../products/products.entity";
import { CartEntity } from "./cart.entity";





@Entity("cart-items")
export class CartItemsEntity extends BaseEntity{
   
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(Type => CartEntity, entity => entity.id, {nullable:false})
    @JoinColumn({
        name:"cartId"
    })
    cartId: CartEntity;

    @ManyToOne(Type => ProductsEntity, entity => entity.id, {nullable:false})
    @JoinColumn({
        name:"productId"
    })
    productId : ProductsEntity;

    @Column({type:"integer",nullable:false})
    count:number
    
    

}