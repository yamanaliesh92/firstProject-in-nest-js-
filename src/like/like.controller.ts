import { IRequest } from './../user/shared/authguard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../user/shared/authguard';
import { createLike } from './dto/createLike.dto';
import { LikerService } from './like.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResLike } from './dto/resLike.res';

@Controller('like')
export class LikeController {
  constructor(private readonly likerser: LikerService) {}

  @ApiOperation({ summary: 'createLike' })
  @ApiResponse({ type: ResLike })
  @UseGuards(AuthGuard())
  @Post()
  async createLike(@Body() body: createLike, @Req() req: IRequest) {
    return await this.likerser.createLike(body, req.user.id);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getLike(@Param('id') id: number) {
    return await this.likerser.getLike(id);
  }

  @UseGuards(AuthGuard())
  @Delete(':id')
  async deleteLike(@Param('id') id: number, @Req() req: IRequest) {
    await this.likerser.deleteLike(id, req.user.id);
    return `delete Like ${id} is done`;
  }
}
