import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { addUserDto } from './dto/adduserDto.dto';
import { userFilterDto } from './dto/filterDto.dto';
import { loginDto } from './dto/loginDto.dto';
import { tokenControlDto } from './dto/tokenControlDto.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService:UsersService
    ){}

    @Get()
    getAll(){
        return this.usersService.getAll()
    }

    @Get()
    getUser(
        @Query() filter:userFilterDto
    ){
        return this.usersService.getUser(filter)
    }
    @Post()
    addUser(
        @Body() data:addUserDto
    ){
        return this.usersService.addUser(data).then(res=>({
            message:'Ekleme işlemi başarıyla tamamlandı.'
        })).catch(e=> {throw new InternalServerErrorException(e.message||e)})

    }

    @Post("/login")
    login(@Body() data:loginDto){
        return this.usersService.login(data)

    }


    @Post("/token-control")
    tokenControl(
        @Body() data:tokenControlDto ){
            return this.usersService.tokenControl(data)}


    @Put('/:id')
    updateUser(
        @Body() data:addUserDto,
        @Param('id',ParseIntPipe) id:number
    ){
        return this.usersService.updateUser(data,id).then(res=>({
            message:'Güncelleme işlemi başarıyla tamamlandı.'
        })).catch(e=> {throw new InternalServerErrorException(e.message||e)})
    }


    @Delete('/:id')
    deleteUser(
        @Param('id',ParseIntPipe) id:number,
    ){
        return this.usersService.deleteUser(id).then(res=>({
            message:'Silme işlemi başarıyla tamamlandı.'
        })).catch(e=> {throw new InternalServerErrorException(e.message||e)})
    }
}
