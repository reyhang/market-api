import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";


export class addUserDto{

    @IsString()
    name:string
    surname:string
    mail:string
    password:string
    phone:string 


}