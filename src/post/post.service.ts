import { UpdatePostDto } from './dto/updatePost.dto';
import { lastValueFrom, NotFoundError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { createPostDto } from './dto/creatPost.dto';
import { IRequest } from './../user/shared/authguard';
import { REQUEST } from '@nestjs/core';
import { PostDoa } from './shared/post.dao';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './post.entity';
import { use } from 'chai';
import { EntityNotFoundError } from 'typeorm';
import { ResponseCreatePost } from './dto/responseCreatePost.res';
import { PgationDto } from './dto/pagintion.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postdoa: PostDoa,
    private readonly http: HttpService,
  ) {}
  private handelError(err: unknown) {
    if (err instanceof HttpException) throw err;

    throw err;
  }

  /**
   * Get Post by id
   * @param id the id of the target post
   * @returns a post that exist
   */
  async get(id: number) {
    try {
      return await this.postdoa.findone({ id });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      Logger.error('Error occoured while getting a post', { err });
      throw new InternalServerErrorException();
    }
  }

  async createPost(dto: createPostDto, userId: number, img: any) {
    try {
      const formData = new URLSearchParams();

      formData.append('title', dto.title);
      formData.append('desc', dto.desc);
      formData.append('image', img);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          formData,
        ),
      );

      const post = new Post({
        desc: dto.desc,
        title: dto.title,
        userId: userId,
        img: data.data.display_url as any,
      });
      const posts = await this.postdoa.save(post);
      const result = new ResponseCreatePost({ post: posts });
      return result;
    } catch (err) {
      Logger.log('error occured during createPost');
      this.handelError(err);
    }
  }
  async updateImg(img: any, id: number) {
    try {
      const formData = new URLSearchParams();
      formData.set('image', img.buffer?.toString('base64'));

      Logger.log('dlld', { fkk: img, i: img?.buffer?.toString('base64') });

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          formData,
        ),
      );
      Logger.log('dl;dlldld', { data });

      const update = await this.postdoa.update({
        where: { id: id },
        update: { img: data.data.display_url as any },
      });
      if (update.affected === 0) {
        throw new BadRequestException('please try again');
      }
      return update;
    } catch (err) {
      Logger.log('error occured in upload img', { err });
      this.handelError(err);
    }
  }

  /**
   *
   * @param id the id of the target post
   * @param dto the update
   *  ...(dto.title ? { title: dto.title } : {}),
        ...(dto.desc ? { desc: dto.desc } : {}),
   */
  async updatePost(id: number, dto: UpdatePostDto) {
    try {
      const update: Partial<Post> = {};

      const { affected } = await this.postdoa.update({
        where: { id },
        update: { title: dto.title },
      });

      if (affected === 0) {
        Logger.log('result', update);
        throw new NotFoundException('The target post was not found.');
      }
    } catch (err) {
      Logger.log('error occured during updatePost', { err });
      this.handelError(err);
    }
  }

  async deletePost(id: number) {
    try {
      const result = await this.postdoa.delete({ id: id });

      if (result.affected === 0) {
        Logger.log('result', result);
        throw new BadRequestException('try again no thing is deleting');
      }
    } catch (err) {
      Logger.log('error occured during updatePost', { err });
      this.handelError(err);
    }
  }

  async allPosts(userId: number) {
    try {
      return await this.postdoa.find({ userId: userId });
    } catch (err) {
      Logger.log('error occured during getAllPost', { err });
      this.handelError(err);
    }
  }

  async findAllPosts(dto: PgationDto) {
    try {
      return await this.postdoa.findAllPost({
        pagation: { page: dto.page, limit: dto.limit },
      });
    } catch (err) {
      Logger.log('error occured during getAllPost', { err });
      this.handelError(err);
    }
  }
}
