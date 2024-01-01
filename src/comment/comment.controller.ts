import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
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
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.api';
import { CommentGuard } from './shared/auth.gard.comment';

@Controller('comment')
export class CommentController {
  constructor(private readonly commenstser: CommentService) {}

  @ApiOperation({ summary: 'test comment' })
  @ApiResponse({ type: ResComment })
  @UseGuards(AuthGuard())
  @Post()
  async createComments(@Body() body: CreateCommentDto, @Req() req: IRequest) {
    try {
      return await this.commenstser.createComment(body, req.user.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard())
  @ApiResponse({ type: ResComment })
  @Get(':id')
  async getAllComment(@Param('id') postId: number) {
    try {
      return await this.commenstser.find(postId);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }

  @UseGuards(AuthGuard(), CommentGuard)
  @ApiResponse({ type: 'string' })
  @Delete('del/:id')
  async delete(@Param('id') postId: number) {
    try {
      await this.commenstser.deleteComment(postId);
      return `delete comment ${postId} is done `;
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
  @UseGuards(AuthGuard(), CommentGuard)
  @ApiResponse({ type: 'string' })
  @Put('up/:id')
  async updateComment(@Body() body: UpdateCommentDto, @Param('id') id: number) {
    try {
      await this.commenstser.update(id, body);
      return `updateComment comment ${id} is done `;
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again...',
      );
    }
  }
}
