import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Comment } from './comment.entity';

interface IUpdate {
  where: FindOptionsWhere<Comment>;
  update: QueryDeepPartialEntity<Comment>;
}
@Injectable()
export class CommentDao {
  constructor(
    @InjectRepository(Comment)
    private readonly commenteneity: Repository<Comment>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occured during commentdao', err);
    throw err;
  }

  async save(data: Comment) {
    try {
      return await this.commenteneity.save(data);
    } catch (err) {
      this.handelError(err);
    }
  }

  async find(where: FindOptionsWhere<Comment>) {
    try {
      return await this.commenteneity.find({
        where: where,
        relations: { user: true },
      });
    } catch (Err) {
      Logger.log('error occured during ');
      this.handelError(Err);
    }
  }

  async findOne(where: FindOptionsWhere<Comment>) {
    try {
      return await this.commenteneity.findOneOrFail({
        where: where,
        relations: { user: true },
      });
    } catch (err) {
      this.handelError(err);
    }
  }
  async delete(where: FindOptionsWhere<Comment>) {
    try {
      return await this.commenteneity.delete(where);
    } catch (Err) {
      Logger.log('error occurded during in delete Error', Err);
      this.handelError(Err);
    }
  }

  async update(opt: IUpdate) {
    try {
      return await this.commenteneity.update(opt.where, opt.update);
    } catch (Err) {
      Logger.log('error occurded during in update Error', Err);
      this.handelError(Err);
    }
  }
}
