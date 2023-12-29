import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'yaman@gamil.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'yaman@gamil.com' })
  password: string;

  constructor(dto: Partial<loginUserDto>) {
    Object.assign(this, dto);
  }

  static mockBodyLogin() {
    return new loginUserDto({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
}
