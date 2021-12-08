import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";



export class addCartDto{

    @Type(()=>Number)
    @IsNumber()
    memberId:number

}