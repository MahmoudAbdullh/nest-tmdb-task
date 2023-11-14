import { PartialType } from '@nestjs/swagger';
import { CreateGenerDto } from './create-gener.dto';

export class UpdateGenerDto extends PartialType(CreateGenerDto) {}
