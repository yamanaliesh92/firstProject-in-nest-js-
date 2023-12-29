import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post.entity';

export class ResponseCreatePost {
  @ApiProperty({
    type: Post,
    example: {
      userId: 3,
      desc: 'desc in swagger',
      id: 44,
      title: 'hey in test swagger',
    },
  })
  post: Post;

  constructor(dto: Partial<ResponseCreatePost>) {
    Object.assign(this, dto);
  }
}
