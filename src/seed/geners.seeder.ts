import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeederInterface } from './seeder.interface';
import { Gener } from 'src/geners/entities/gener.entity';
import { TmdbClient } from './tmdb.client';

@Injectable()
export class GenersSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Gener)
    private readonly generRepository: Repository<Gener>,
  ) {}

  async seed() {
    const tmdbClient = new TmdbClient();
    const geners = await tmdbClient.loadGeners();
    await this.generRepository.insert(geners);
  }
}
