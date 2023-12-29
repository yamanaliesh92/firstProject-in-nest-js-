import { ApiProperty } from '@nestjs/swagger';
import { Like } from '../like.entity';

export class ResLike {
  @ApiProperty()
  like: Like;

  constructor(dto: Partial<ResLike>) {
    Object.assign(this, dto);
  }
}
