import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  constructor(dto: Partial<ForgetPasswordDto>) {
    Object.assign(this, dto);
  }
}
