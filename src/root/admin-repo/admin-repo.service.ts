import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepo } from './admin-repo.repository';
import { loginDto } from './dto/loginDto.dto';
import * as jwt from 'jsonwebtoken';
import { tokenControlDto } from './dto/tokenControlDto.dto';

@Injectable()
export class AdminRepoService {
  constructor(
    @InjectRepository(AdminRepo, 'market')
    private adminRepo: AdminRepo,
  ) {}

  async getAll() {
    const query = await this.adminRepo.find({
      select: ['id', 'name', 'surname', 'email', 'password'],
    });
    return query;
  }

  async login(data: loginDto) {
    const query = await this.adminRepo.findOne({
      select: ['id', 'email', 'name', 'surname'],
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (!query) {
      throw new InternalServerErrorException('Böyle bir kullanıcı bulunamadı.');
    }
    const tokenOptions = {
      secretKey: 'r22a01m28iG12yH23JsF9hS',
    };

    const token = jwt.sign(
      { id: query.id, name: query.name, email: query.email },
      tokenOptions.secretKey,
      { expiresIn: '10m' },
    );
    return {
      token,
    };
  }

  async tokenControl(data: tokenControlDto) {
    const tokenOptions = {
      secretKey: 'r22a01m28iG12yH23JsF9hS',
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
}
