import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class addUserDto{


    @IsString()
    name:string;


    @IsString()
    surname:string;


    @Type(()=>Number)
    @IsNumber()
    age:number;


}