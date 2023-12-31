import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  overview: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmpty()
  geners: number[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  tmdb_id: number;
}
