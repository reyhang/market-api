import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addUserDto } from './dto/adduserDto.dto';
import { userFilterDto } from './dto/filterDto.dto';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository,'market')
        private userRepository:UsersRepository
    ){}

    async getAll(){

        const query = await this.userRepository.find({
            select:["name","surname","mail","password","phone"]
        })
        return query;

    }

    async getUser(filter:userFilterDto){
        
        const query =  await this.userRepository.createQueryBuilder('user')
        .select(['user.name','user.surname','user.mail'])
        .where('user.name like :search', {search: `%${filter.text}%`})
        if(filter.mail){
            query.andWhere('user.age < :id',{id:filter.mail})
        }
        return query.getMany()
    }

    async addUser(data:addUserDto){

        return this.userRepository.insert({
            name:data.name,
            surname:data.surname,
            mail:data.mail,
            password:data.password,
            phone:data.phone        
        })
    }

    async updateUser(data:addUserDto,id:number){
        const query = new UsersEntity()
        query.name = data.name;
        query.surname=data.surname;
        return this.userRepository.update({id},query)
    }

    async deleteUser(id:number){
        return this.userRepository.delete(id)
    }
}
