import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class producFilterDto {

    @IsString()
    title:string;


    @Type(()=> Number)
    @IsNumber()
    price:number;

    @IsString()
    barcode:number;



}