import { AuthGuard, IRequest } from './../user/shared/authguard';
import { CreateFollowDto } from './shared/followe.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './followe.service';
import { ApiResponse } from '@nestjs/swagger';
import { Follow } from './follow.entity';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiResponse({ type: Follow })
  async createFollowers(@Body() body: CreateFollowDto, @Req() req: IRequest) {
    try {
      return await this.followService.createFollow(body, req.user.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @Get()
  @ApiResponse({ type: 'string' })
  @UseGuards(AuthGuard())
  async getFollow(@Req() req: IRequest) {
    try {
      return await this.followService.getFollow(req.user.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
  @Delete('del/:id')
  @ApiResponse({ type: 'string' })
  @UseGuards(AuthGuard())
  async delete(@Param('id') id: number, @Req() req: IRequest) {
    try {
      await this.followService.deleteFollow(req.user.id, id);
      return 'unhallow is done';
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
}
