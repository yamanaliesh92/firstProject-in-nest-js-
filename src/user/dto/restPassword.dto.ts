import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RestPassword {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  secret: string;

  constructor(dto: Partial<RestPassword>) {
    Object.assign(this, dto);
  }
}
