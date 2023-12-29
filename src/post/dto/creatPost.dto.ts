import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: { desc: 'Desc in dto' } })
  desc: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: { tilte: 'title in dto' } })
  title: string;

  constructor(dto: Partial<createPostDto>) {
    Object.assign(this, dto);
  }

  static mockCreatePostDto() {
    return new createPostDto({
      title: faker.datatype.string(),
      desc: faker.datatype.string(),
    });
  }
}
