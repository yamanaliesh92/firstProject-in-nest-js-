import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, IRequest } from 'src/user/shared/authguard';
import { CommentService } from './comment.service';
import { ResComment } from './dto/comment.res';
import { CreateCommetnDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.api';
import { CommentGuard } from './shared/auth.gard.comment';

@Controller('comment')
export class CommentController {
  constructor(private readonly commenstser: CommentService) {}

  @ApiOperation({ summary: 'test comment' })
  @ApiResponse({ type: ResComment })
  @UseGuards(AuthGuard())
  @Post()
  async createComments(@Body() body: CreateCommetnDto, @Req() req: IRequest) {
    return await this.commenstser.createCommetn(body, req.user.id);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async getAllComment(@Param('id') postId: number) {
    return await this.commenstser.find(postId);
  }

  @UseGuards(AuthGuard(), CommentGuard)
  @Delete('del/:id')
  async delete(@Param('id') postId: number) {
    await this.commenstser.deltetComment(postId);
    return `delete comment ${postId} is done `;
  }
  @UseGuards(AuthGuard(), CommentGuard)
  @Put('up/:id')
  async updateComment(@Body() body: UpdateCommentDto, @Param('id') id: number) {
    await this.commenstser.update(id, body);
    return `updateComment comment ${id} is done `;
  }
}
