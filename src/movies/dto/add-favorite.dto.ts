import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  movie_id: number;
}
