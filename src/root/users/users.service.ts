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
            select:["name","surname","age"]
        })
        return query;

    }

    async getUser(filter:userFilterDto){
        
        const query =  await this.userRepository.createQueryBuilder('user')
        .select(['user.name','user.surname','user.age'])
        .where('user.name like :search', {search: `%${filter.text}%`})
        if(filter.age){
            query.andWhere('user.age < :id',{id:filter.age})
        }
        return query.getMany()
    }

    async addUser(data:addUserDto){

        const addquery = new UsersEntity()
        addquery.name = data.name;
        addquery.surname=data.surname;
        addquery.age=data.age;

        return this.userRepository.insert({
            name:data.name,
            surname:data.surname,
            age:data.age
        })
    }
    async updateUser(data:addUserDto,id:number){
        const addquery = new UsersEntity()
        addquery.name = data.name;
        addquery.surname=data.surname;
        addquery.age=data.age; 
        return this.userRepository.update({id},addquery)
    }

    async deleteUser(id:number){
        return this.userRepository.delete(id)
    }
}
