import { Like } from './../like/like.entity';
import { Base } from '../shared/base.entity';
import { User } from './../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('post')
export class Post extends Base {
  @ApiProperty()
  @Column({ type: 'text' })
  desc: string;

  @ApiProperty()
  @Column({ type: 'text' })
  title: string;

  @ApiProperty()
  @ManyToOne(() => User, (l) => l.post)
  user: User[];

  @ApiProperty()
  @Column({ type: 'int4' })
  userId: number;

  @ApiProperty()
  @OneToMany(() => Like, (a) => a.post)
  @JoinColumn()
  likes: Like[];

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  img: string;

  constructor(dto: Partial<Post>) {
    super();
    Object.assign(this, dto);
  }
}
