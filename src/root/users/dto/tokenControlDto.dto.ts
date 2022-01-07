import { IsJWT } from "class-validator";


export class tokenControlDto{

    @IsJWT()
    token:string;

}