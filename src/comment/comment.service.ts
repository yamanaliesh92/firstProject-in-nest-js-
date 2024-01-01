import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CommentDao } from './comment.dao';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.api';

@Injectable()
export class CommentService {
  constructor(private readonly commentdao: CommentDao) {}

  private handelError(Error: unknown) {
    Logger.log('Error occurred during commentService', Error);
    throw Error;
  }

  async createComment(dto: CreateCommentDto, userId: number): Promise<Comment> {
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

  async find(postId: number): Promise<Comment[]> {
    try {
      return await this.commentdao.find({ postId: postId });
    } catch (err) {
      Logger.log('error occured during findComment', err);
      this.handelError(err);
    }
  }

  async deleteComment(id: number) {
    try {
      return await this.commentdao.delete({ id: id });
    } catch (err) {
      this.handelError(err);
    }
  }

  async get(id: number): Promise<Comment> {
    try {
      return await this.commentdao.findOne({ id: id });
    } catch (err) {
      this.handelError(err);
    }
  }

  async update(id: number, dto: UpdateCommentDto): Promise<void> {
    try {
      const updates = await this.commentdao.update({
        where: { id: id },
        update: { title: dto.title },
      });
      if (updates.affected === 0) {
        throw new BadRequestException('plebe try again..');
      }
    } catch (err) {
      Logger.log('error occurred during updateComment', err);
      this.handelError(err);
    }
  }
}
