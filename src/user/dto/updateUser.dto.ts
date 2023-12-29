import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class updateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
