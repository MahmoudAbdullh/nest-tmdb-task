import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @ApiProperty()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  vote: number;
}
