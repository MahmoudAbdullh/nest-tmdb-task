import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.getOrThrow('PG_HOST'),
  port: configService.getOrThrow('PG_PORT'),
  database: configService.getOrThrow('DATABASE_NAME'),
  username: configService.getOrThrow('PG_USERNAME'),
  password: configService.getOrThrow('PG_PASSWORD'),
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  synchronize: true,
};
export default typeOrmConfig;

export const seedOrmConfig: TypeOrmModuleOptions = {
  ...typeOrmConfig,
  synchronize: true,
  dropSchema: true,
  logging: ['error', 'warn'],
};
