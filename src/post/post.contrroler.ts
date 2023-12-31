import { PgationDto } from './dto/pagintion.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ControllerResponse } from './../shared/dto/controller-response.dto';
import { PostGuard } from 'src/user/shared/guards/post.auth-gurad';

import { createPostDto } from './dto/creatPost.dto';
import { PostService } from './post.service';
import { AuthGuard as AuthGuard, IRequest } from '../user/shared/authguard';
import { UpdatePostDto } from './dto/updatePost.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseCreatePost } from './dto/responseCreatePost.res';

@Controller('post')
export class PostController {
  constructor(private readonly postser: PostService) {}

  @ApiOperation({ summary: 'create post' })
  @ApiResponse({ description: 'create post ', type: ResponseCreatePost })
  @UseGuards(AuthGuard())
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async createPost(
    @Body() body: createPostDto,
    @Req() req: IRequest,
    @UploadedFile() file,
  ) {
    try {
      return await this.postser.createPost(
        body,
        req.user.id,
        file.buffer?.toString('base64'),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'some went wrong while create post pleas try again',
      );
    }
  }

  @UseGuards(AuthGuard(), PostGuard)
  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('img'))
  async uploadImg(@UploadedFile() file, @Param('id') id: number) {
    await this.postser.updateImg(file, id);

    return `add photo to post is succesfull`;
  }

  @UseGuards(AuthGuard())
  @Get('all')
  async allPosts(@Req() req: IRequest) {
    try {
      return await this.postser.allPosts(req.user.id);
    } catch (err) {
      throw new InternalServerErrorException(
        'some went wrong please  try again',
      );
    }
  }
  @UseGuards(AuthGuard(), PostGuard)
  @ApiResponse({ type: 'string' })
  @Put(':id')
  async updatePosts(@Body() body: UpdatePostDto, @Param('id') id: number) {
    try {
      await this.postser.updatePost(id, body);
      return 'Post was updated successfully.';
    } catch (err) {
      throw new InternalServerErrorException(
        'some went wrong please  try again',
      );
    }
  }

  @UseGuards(AuthGuard(), PostGuard)
  @ApiResponse({ type: 'string' })
  @Delete('del/:id')
  async deletePosts(@Param('id') id: number) {
    try {
      await this.postser.deletePost(id);

      return 'Post was deleted.';
    } catch (err) {
      throw new InternalServerErrorException(
        'some went wrong while create post pleas try again',
      );
    }
  }

  @UseGuards(AuthGuard())
  @ApiResponse({ type: [ResponseCreatePost] })
  @Get('getAll/post')
  async getAllPost(@Query() query: PgationDto) {
    try {
      return await this.postser.findAllPosts(query);
    } catch (err) {
      throw new InternalServerErrorException(
        'some went wrong while create post pleas try again',
      );
    }
  }
}
