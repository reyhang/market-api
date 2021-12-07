import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";



export class userFilterDto {
    @IsString()
    text:string;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    age:number;
}