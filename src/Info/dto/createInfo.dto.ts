import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInfoDto {
  @ApiProperty({ example: 'spain' })
  @IsString()
  @IsNotEmpty()
  livesIn: string;

  @ApiProperty({ example: 'singal' })
  @IsString()
  @IsNotEmpty()
  relationShip: string;

  @ApiProperty({ example: 'doctor' })
  @IsString()
  @IsNotEmpty()
  workAt: string;

  @ApiProperty({ example: 'spain' })
  @IsString()
  @IsNotEmpty()
  country: string;

  constructor(dto: Partial<CreateInfoDto>) {
    Object.assign(this, dto);
  }

  static mockCreateInfoDto() {
    return new CreateInfoDto({
      country: faker.datatype.string(),
      livesIn: faker.datatype.string(),
      relationShip: faker.datatype.string(),
      workAt: faker.datatype.string(),
    });
  }
}
