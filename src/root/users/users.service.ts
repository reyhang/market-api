import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addUserDto } from './dto/adduserDto.dto';
import { userFilterDto } from './dto/filterDto.dto';
import { loginDto } from './dto/loginDto.dto';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';
import * as jwt from 'jsonwebtoken';
import { tokenControlDto } from './dto/tokenControlDto.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository,'market')
        private userRepository:UsersRepository
    ){}

    async login(data:loginDto){
        const query = await this.userRepository.findOne({
            select:["id","mail","name","surname"],
            where:{
                mail:data.mail,
                password:data.password,

            }
        })
        if(!query){
            throw new InternalServerErrorException("Böyle bir kullanıcı bulunamadı.")
        }
        const tokenOptions = {
            secretKey: 'r22a01m28iuS3rG12yH23JsF9hS',
          };

          const token = jwt.sign(
            { id: query.id,mail: query.mail },
            tokenOptions.secretKey,
            { expiresIn: '10m' },
          );
          return {
            token,
          };  
    }

    async tokenControl(data: tokenControlDto) {
        const tokenOptions = {
          secretKey: 'r22a01m2uS3r8iG12yH23JsF9hS',
        };
    
        const verif = jwt.verify(
          data.token,
          tokenOptions.secretKey,
          (err, user) => {
            if (err) {
              throw new ForbiddenException(err);
            } else {
              return user;
            }
          },
        );
    
        return verif;
      }

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
