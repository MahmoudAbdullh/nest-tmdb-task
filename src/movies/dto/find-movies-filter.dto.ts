import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindMoviesFilter {
  @IsOptional()
  @ApiPropertyOptional()
  search!: string | null;

  @IsNumber()
  @Transform(({ value }) => +value)
  @ApiPropertyOptional()
  gener_id!: number;

  page!: number;

  limit!: number;
}
