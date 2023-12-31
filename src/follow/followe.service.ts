import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Follow } from './follow.entity';
import { FollowDao } from './shared/follow.doa';
import { CreateFollowDto } from './shared/followe.dto';

@Injectable()
export class FollowService {
  constructor(private readonly followDao: FollowDao) {}

  private handelError(err: unknown) {
    Logger.log('Error occured during servicer error');
    throw err;
  }

  async createFollow(dto: CreateFollowDto, userId: number): Promise<Follow> {
    try {
      const date = new Follow({
        followingId: dto.followingId,
        followerId: userId,
      });

      const result = await this.followDao.save(date);
      return await this.followDao.findone({ id: result.id });
    } catch (err) {
      Logger.log('Error occured during crateFollow', { err });
      this.handelError(err);
    }
  }

  async getFollow(userId: number): Promise<Follow[]> {
    try {
      return await this.followDao.find({ followerId: userId });
    } catch (Err) {
      Logger.log('Error occured during getAllFollow', { Err });
      this.handelError(Err);
    }
  }

  async deleteFollow(userId: number, id: number): Promise<void> {
    try {
      const result = await this.followDao.delete({
        id: id,
        followerId: userId,
      });
      if (result.affected === 0) {
        throw new BadRequestException('no affected try again');
      }
    } catch (Err) {
      Logger.log('Error occurred during deleteFollow', { Err });
      this.handelError(Err);
    }
  }
}
