import { BaseEntity, Column, Entity,PrimaryGeneratedColumn } from "typeorm";




@Entity("products")
export class ProductsEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",unique:true,nullable:false,comment:"Ürün Adı"})
    title:string;

    @Column({type:"integer",nullable:false,comment:"Ürün Fiyatı"})
    price:number;

    @Column({type:"varchar",unique:true,nullable:false,comment:"Barkod Numarası"})
    barcode:string;

    @Column({type:'varchar',nullable:true})
    imageUrl:string;

}