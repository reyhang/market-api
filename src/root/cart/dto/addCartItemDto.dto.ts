import { IsNumber, IsString } from "class-validator";

export class addCartItemDto{
    @IsString()
    barcode:string;

}