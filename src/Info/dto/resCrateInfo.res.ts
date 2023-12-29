import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Info } from '../info.entity';

export class CreateInfoRes {
  @ApiProperty({
    example: {
      workAt: 'teacher',
      relationShip: 'singel',
      livesIn: 'spain',
      country: 'spain',
    },
  })
  info: Info;

  constructor(dto: Partial<CreateInfoRes>) {
    Object.assign(this, dto);
  }
}
