import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gamil.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'yaman21' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'yamanaleash' })
  @IsString()
  @IsNotEmpty()
  username: string;

  constructor(dto: Partial<CreateUserDto>) {
    Object.assign(this, dto);
  }

  static dtoCreate() {
    return new CreateUserDto({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.datatype.string(),
    });
  }
}
