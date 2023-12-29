import { User } from './../user/user.entity';
import { Base } from 'src/shared/base.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Post } from 'src/post/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comment')
export class Comment extends Base {
  @ApiProperty()
  @Column({ type: 'text' })
  @JoinColumn()
  title: string;

  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @Column({ type: 'int4' })
  userId: number;

  @ApiProperty()
  @OneToMany(() => Post, (s) => s.id)
  post: Post;

  @ApiProperty()
  @Column({ type: 'int4' })
  postId: number;

  constructor(dto: Partial<Comment>) {
    super();
    Object.assign(this, dto);
  }
}
