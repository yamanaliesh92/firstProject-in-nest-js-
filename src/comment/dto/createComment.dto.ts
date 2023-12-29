import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommetnDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  constructor(dto: Partial<CreateCommetnDto>) {
    Object.assign(this, dto);
  }
}
