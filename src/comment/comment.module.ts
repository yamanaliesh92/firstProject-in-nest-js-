import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from 'src/user/shared/jsonWebToken';
import { CommentController } from './comment.controller';
import { CommentDao } from './comment.dao';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService, CommentDao, Jwt],
  controllers: [CommentController],
})
export class CommentModule {}
