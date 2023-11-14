import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  vote: number;
}
