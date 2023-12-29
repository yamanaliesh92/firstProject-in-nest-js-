import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommentDao } from './comment.dao';
import { Comment } from './comment.entity';
import { CreateCommetnDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.api';

@Injectable()
export class CommentService {
  constructor(private readonly commentdao: CommentDao) {}

  private handelError(Error: unknown) {
    Logger.log('Error occured during commentService', Error);
    throw Error;
  }

  async createCommetn(dto: CreateCommetnDto, userId: number) {
    try {
      const data = new Comment({
        userId: userId,
        postId: dto.postId,
        title: dto.title,
      });
      const result = await this.commentdao.save(data);
      return await this.commentdao.findOne({ id: result.id });
    } catch (err) {
      Logger.log('error occured during createComment', err);
      this.handelError(err);
    }
  }

  async find(postId: number) {
    try {
      return await this.commentdao.find({ postId: postId });
    } catch (err) {
      Logger.log('error occured during findComment', err);
      this.handelError(err);
    }
  }

  async deltetComment(id: number) {
    try {
      return await this.commentdao.delete({ id: id });
    } catch (err) {
      this.handelError(err);
    }
  }

  async get(id: number) {
    try {
      return await this.commentdao.findOne({ id: id });
    } catch (err) {
      this.handelError(err);
    }
  }

  async update(id: number, dto: UpdateCommentDto) {
    try {
      const updates = await this.commentdao.update({
        where: { id: id },
        update: { title: dto.title },
      });
      if (updates.affected === 0) {
        throw new BadRequestException('plese try again');
      }
    } catch (err) {
      Logger.log('error occured during updateComment', err);
      this.handelError(err);
    }
  }
}
