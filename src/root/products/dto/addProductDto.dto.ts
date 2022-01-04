import { Type } from "class-transformer";
import { IsJWT, IsNumber, IsString } from "class-validator";
import { ProductsEntity } from "../products.entity";



export class addProductDto{

   
    @IsString()
    title:string;


    @Type(()=>Number)
    @IsNumber()
    price:string;

    @IsString()
    barcode:string

    @IsString()
    imageUrl:string 
    
    @IsJWT()
    token:string

    toEntity(){
        const query = new ProductsEntity()
        query.barcode=this.barcode;
        query.price=this.price;
        query.title=this.title;
        query.imageUrl=this.imageUrl;
        return query
    }
    
  

}