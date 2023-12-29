import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../comment.entity';

export class ResComment {
  @ApiProperty()
  comment: Comment;

  constructor(dto: Partial<ResComment>) {
    Object.assign(this, dto);
  }
}
