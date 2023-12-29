import { Base } from '../shared/base.entity';
import { User } from './../user/user.entity';
import { Post } from '../post/post.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('like')
export class Like extends Base {
  @OneToOne(() => User)
  user: User;

  @Column({ type: 'int4' })
  @ApiProperty()
  userId: number;

  @ManyToOne(() => Post, (l) => l.likes)
  @JoinColumn()
  post: Post;

  @Column({ type: 'int4' })
  @ApiProperty()
  postId: number;

  constructor(dto: Partial<Like>) {
    super();
    Object.assign(this, dto);
  }
}
