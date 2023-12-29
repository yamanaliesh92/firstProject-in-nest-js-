import { faker } from '@faker-js/faker';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../shared/base.entity';
import { User } from './../user/user.entity';

@Entity('follows')
export class Followe extends Base {
  @ManyToOne(() => User)
  following: User;

  @Column({ type: 'int4' })
  followingId: number;

  @ManyToOne(() => User)
  follower: User;

  @Column({ type: 'int4' })
  followerId: number;

  constructor(dto: Partial<Followe>) {
    super();
    Object.assign(this, dto);
  }

  static mockFollow() {
    return new Followe({
      followerId: faker.datatype.number(),
      followingId: faker.datatype.number(),
    });
  }
}
