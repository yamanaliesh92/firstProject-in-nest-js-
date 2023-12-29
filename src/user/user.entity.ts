import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Followe } from 'src/follow/follow.entity';
import { Post } from 'src/post/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { addHours } from 'date-fns';

import { Base } from '../shared/base.entity';

export enum Role {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'OWNER' = 'OWNER',
}
export enum State {
  'ACTIVE' = 'ACTIVE',
  'BLOCK' = 'BLOCk',
}

export class TokenSecret {
  @ApiProperty()
  @Column({ type: 'text' })
  value: string;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  createAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamptz' })
  exprieAt: Date;

  constructor(secret: string) {
    this.value = secret;
    this.createAt = new Date();
    this.exprieAt = addHours(new Date(), 48);
  }
}

@Entity('user')
export class User extends Base {
  @ApiProperty()
  @Column({ type: 'text', unique: true })
  email: string;

  // @ApiProperty()
  // @Column({ type: 'text' })
  // phone: string;

  followCount: number;

  @ApiProperty()
  @Column({ type: 'text' })
  password: string;

  @ApiProperty()
  @Column({ type: 'text' })
  username: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  image: string;

  @ApiProperty({ enum: Role, type: 'enum', default: Role.USER })
  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ApiProperty()
  @OneToMany(() => Followe, (l) => l.following)
  follows: Followe[];

  @ApiProperty()
  @OneToMany(() => Post, (l) => l.user)
  post: Post[];

  @ApiProperty({ enum: State, type: 'enum', default: State.ACTIVE })
  @Column({ type: 'enum', enum: State })
  state: State;

  @ApiProperty({ type: TokenSecret, required: false })
  @Column({ type: 'simple-json', nullable: true })
  secret: TokenSecret;

  constructor(dto: Partial<User>) {
    super();
    Object.assign(this, dto);
  }

  static mock() {
    return new User({
      role: faker.helpers.arrayElement(Object.values(Role)),
      state: faker.helpers.arrayElement(Object.values(State)),
      id: faker.datatype.number(),
      createAt: faker.datatype.datetime(),
      updateAt: faker.datatype.datetime(),
      email: faker.internet.email(),
      username: faker.datatype.string(),
      password: faker.internet.password(),
      image: faker.internet.url(),
    });
  }
}
