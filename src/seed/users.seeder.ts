import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeederInterface } from './seeder.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersSeeder implements SeederInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async seed() {
    const data = [
      {
        name: 'admin',
        email: 'admin@mail.com',
        age: 33,
      },
      {
        name: 'user seed',
        email: 'user@mail.com',
        age: 21,
      },
    ];
    await this.usersRepository.insert(data);
  }
}
