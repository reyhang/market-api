import { Body, Controller, ForbiddenException, Get, Post } from "@nestjs/common";
import { AdminRepoService } from "./admin-repo.service";
import * as jwt from "jsonwebtoken"
import { loginDto } from "./dto/loginDto.dto";
import { tokenControlDto } from "./dto/tokenControlDto.dto";

/*var tokenBase = "r22a01m28iG12yH23JsF9hS"*/

const tokenOptions = {
    secretKey:"r22a01m28iG12yH23JsF9hS",
}

const token = jwt.sign( {id:"id"},tokenOptions.secretKey,{expiresIn:"10m"})

const verif =  jwt.verify(token,tokenOptions.secretKey) 

if(!verif) {
    throw new ForbiddenException("Erişim Reddedildi.")
}

@Controller("admin-repo")
  export class AdminController {
      constructor (private adminService:AdminRepoService){}
      
      @Get()
      getAll(){
          return this.adminService.getAll()
      }

      @Post()
      login(@Body() data:loginDto){
          return this.adminService.login(data)

      }

      @Get("/token-control")
        tokenControl(
            @Body() data:tokenControlDto ){
                return this.adminService.tokenControl(data)}
  }