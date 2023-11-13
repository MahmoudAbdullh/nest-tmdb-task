import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(name: string, email: string, age: number): Promise<UserEntity> {
    const user = this.repo.create({ name, email, age });
    return this.repo.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }
}
