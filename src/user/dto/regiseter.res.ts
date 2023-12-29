import { Role, State, User } from './../user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class RegiseterRes {
  @ApiProperty({
    type: User,
    example: {
      email: 'yaman@gmail.com',
      password: 'yaman12',
      username: 'yaman',
      role: 'user',
      state: 'active',
      id: 1,
    },
  })
  user: User;

  @ApiProperty({
    type: 'string',
    description: 'jwt token',
    example: { token: 'fkdksdkswq1erkk' },
  })
  token: string;

  constructor(dto: Partial<RegiseterRes>) {
    Object.assign(this, dto);
  }
  // static mockResRegister() {
  //   return new RegiseterRes({
  //     user: {
  //       role: faker.helpers.arrayElement(Object.values(Role)),
  //       state: faker.helpers.arrayElement(Object.values(State)),
  //       id: faker.datatype.number(),
  //       createAt: faker.datatype.datetime(),
  //       updateAt: faker.datatype.datetime(),
  //       email: faker.internet.email(),
  //       username: faker.datatype.string(),
  //       password: faker.internet.password(),
  //       image: faker.internet.url(),
  //       follows: [
  //         {
  //           followingId: faker.datatype.number(),
  //           followerId: faker.datatype.number(),

  //           id: faker.datatype.number(),
  //           createAt: faker.datatype.datetime(),
  //           updateAt: faker.datatype.datetime(),
  //         },
  //       ],
  //     },
  //     token: faker.datatype.string(),
  //   });
  // }
}
