import { IsString } from "class-validator";
import { AdminRepoEntity } from "../admin-repo.entity";



export class loginDto {

    @IsString()
    email:string;

    @IsString()
    password:string;

}