import { AuthGuard, IRequest } from './../user/shared/authguard';
import { CreateFollowDto } from './shared/followe.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './followe.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createFollowers(@Body() body: CreateFollowDto, @Req() req: IRequest) {
    return await this.followService.createFollow(body, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getFollo(@Req() req: IRequest) {
    return await this.followService.getFollow(req.user.id);
  }
  @Delete('del/:id')
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number, @Req() req: IRequest) {
    await this.followService.deleteFollow(req.user.id, id);
    return 'unfollow is done';
  }
}
