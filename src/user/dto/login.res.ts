import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';

export class loginRes {
  @ApiProperty({
    type: 'string',
    description: 'jwt token',
    example: { token: 'fkdksdkswq1erkk' },
  })
  token: string;

  constructor(dto: Partial<loginRes>) {
    Object.assign(this, dto);
  }
  static mockResLLogin() {
    return new loginRes({
      token: faker.datatype.json(),
    });
  }
}
