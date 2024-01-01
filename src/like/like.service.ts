import { LikeDoa } from './shared/liker.doa';

import { IRequest } from './../user/shared/authguard';
import { REQUEST } from '@nestjs/core';

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Like } from './like.entity';
import { createLike } from './dto/createLike.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LikerService {
  constructor(
    private readonly likedoa: LikeDoa,
    @Inject(REQUEST) private readonly req: IRequest,
    @InjectRepository(Like) private readonly postentity: Repository<Like>,
  ) {}
  private handelError(err: unknown) {
    throw err;
  }

  private async deleteIfExist(userId: number, postId: number) {
    try {
      const existingLike = await this.likedoa.findone({
        userId: userId,
        postId: postId,
      });

      if (existingLike) {
        await this.likedoa.delete({ id: existingLike.id });
        return false;
      }
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        return true;
      }

      this.handelError(err);
    }
  }

  async createLike(
    dto: createLike,
    userId: number,
  ): Promise<Like | 'Like was deleted.'> {
    try {
      const shouldCreateLike = await this.deleteIfExist(userId, dto.postId);

      if (shouldCreateLike) {
        const like = new Like({
          userId: userId,
          postId: dto.postId,
        });

        return await this.likedoa.save(like);
      } else {
        return 'Like was deleted.';
      }
    } catch (err) {
      Logger.log('error occured during createlike', { err });
      this.handelError(err);
    }
  }

  async getLike(postId: number): Promise<
    | 'no one like in this post '
    | {
        find: number;
      }
  > {
    try {
      const find = await this.postentity.count({ where: { postId: postId } });

      if (find === 0) {
        return 'no one like in this post ';
      }
      return { find };
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      Logger.log('error occured during getLike', { err });
      this.handelError(err);
    }
  }

  async deleteLike(Id: number, userId: number): Promise<void> {
    try {
      const result = await this.likedoa.delete({ id: Id, userId: userId });
      if (result.affected === 0) {
        Logger.log('result', result);
        throw new NotFoundException('try again no thing is deleting');
      }
    } catch (err) {
      Logger.log('error occured during deleteLike', { err });
      this.handelError(err);
    }
  }
}
