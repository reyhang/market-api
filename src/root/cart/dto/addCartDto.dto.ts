import { IsDate, IsNumber, IsString } from "class-validator";



export class addCartDto{

    @IsNumber()
    memberId:number

}