import { Injectable, Logger } from '@nestjs/common';
import { Promise as Bluebird } from 'bluebird';
import { SeederInterface } from './seeder.interface';
import { UsersSeeder } from './users.seeder';
import { GenersSeeder } from './geners.seeder';
import { MoviesSeeder } from './movies.seeder';

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly usersSeeder: UsersSeeder,
    private readonly genersSeeder: GenersSeeder,
    private readonly moviesSeeder: MoviesSeeder,
  ) {
    this.seeders = [this.usersSeeder, this.genersSeeder, this.moviesSeeder];
  }

  async seed() {
    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed();
    });
  }
}
