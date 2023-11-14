import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenersService } from './geners.service';
import { GenersController } from './geners.controller';
import { Gener } from './entities/gener.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gener])],
  controllers: [GenersController],
  providers: [GenersService],
  exports: [GenersService],
})
export class GenersModule {}
