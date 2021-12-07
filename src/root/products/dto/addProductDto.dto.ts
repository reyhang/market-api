import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ProductsEntity } from "../products.entity";



export class addProductDto{

   
    @IsString()
    title:string;


    @Type(()=>Number)
    @IsNumber()
    price:number;

    @IsString()
    barcode:string

    toEntity(){
        const query = new ProductsEntity()
        query.barcode=this.barcode;
        query.price=this.price;
        query.title=this.title;
        return query
    }
    

}