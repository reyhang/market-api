import {IsString } from "class-validator";



export class userFilterDto {
    @IsString()
    text:string;

    @IsString()
    name:string
    surname:string
    mail:string
    password:string
    phone:string 
}
