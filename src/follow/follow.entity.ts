import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '../shared/base.entity';
import { User } from './../user/user.entity';

@Entity('follows')
export class Follow extends Base {
  @ManyToOne(() => User)
  following: User;

  @Column({ type: 'int4' })
  followingId: number;

  @ManyToOne(() => User)
  follower: User;

  @Column({ type: 'int4' })
  followerId: number;

  constructor(dto: Partial<Follow>) {
    super();
    Object.assign(this, dto);
  }
}
