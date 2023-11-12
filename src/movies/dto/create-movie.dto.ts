import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  overview: string;

  @ApiProperty()
  @IsNotEmpty()
  gener_ids: number[];

  @ApiProperty()
  @IsNumber()
  tmdb_id: number;
}
