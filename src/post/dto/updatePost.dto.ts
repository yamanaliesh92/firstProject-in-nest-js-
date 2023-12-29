import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // desc?: string;

  constructor(dto: Partial<UpdatePostDto>) {
    Object.assign(this, dto);
  }
  static mockUpdatePostDto() {
    return new UpdatePostDto({
      title: faker.datatype.string(),
    });
  }
}
