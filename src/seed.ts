import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(SeedModule);
  const seeder = app.get(SeedService);
  if (!!process.env.TMDB_TOKEN) {
    await seeder.seed();
  } else {
    throw new Error('No Token provided for TMDB API Seeder!!');
  }
  await app.close();
}

bootstrap();
