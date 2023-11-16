import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private favoritesService: FavoritesService,
  ) {}

  async create({ name, email, age }: CreateUserDto): Promise<User> {
    const existUser = await this.repo.findOneBy({ email });
    if (!!existUser) throw new BadRequestException('email already used before');
    const user = this.repo.create({ name, email, age });
    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({
      id,
    });
  }
}
