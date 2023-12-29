import { faker } from '@faker-js/faker';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInfoDto {
  @IsString()
  @IsOptional()
  livesIn?: string;

  @IsString()
  @IsOptional()
  relationShip?: string;

  @IsString()
  @IsOptional()
  workAt?: string;

  @IsString()
  @IsOptional()
  country?: string;

  constructor(dto: Partial<UpdateInfoDto>) {
    Object.assign(this, dto);
  }

  static mockUpdateInfoDto() {
    return new UpdateInfoDto({
      country: faker.datatype.string(),
      livesIn: faker.datatype.string(),
      relationShip: faker.datatype.string(),
      workAt: faker.datatype.string(),
    });
  }
}
