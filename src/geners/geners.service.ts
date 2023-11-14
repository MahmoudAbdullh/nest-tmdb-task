import { Injectable } from '@nestjs/common';
import { CreateGenerDto } from './dto/create-gener.dto';
import { In, Repository } from 'typeorm';
import { Gener } from './entities/gener.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GenersService {
  constructor(@InjectRepository(Gener) private repo: Repository<Gener>) {}

  create(createGenerDto: CreateGenerDto) {
    const newGener = this.repo.create({
      name: createGenerDto.name,
      tmdb_id: createGenerDto.tmdb_id,
    });
    return this.repo.save(newGener);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findManyById(ids: number[]) {
    return this.repo.find({ where: { id: In(ids) } });
  }

  findManyByTmdbId(tmdb_id: number[]) {
    return this.repo.find({ where: { tmdb_id: In(tmdb_id) } });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
