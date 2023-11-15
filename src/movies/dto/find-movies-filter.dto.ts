import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindMoviesFilter {
  @ApiPropertyOptional()
  @IsOptional()
  search: string | null;

  @IsNumber()
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => +value)
  gener_id: number;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ default: 10 })
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  limit: number;
}
