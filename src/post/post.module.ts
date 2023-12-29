import { PostController } from './post.contrroler';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostDoa } from './shared/post.dao';
import { Jwt } from '../user/shared/jsonWebToken';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), HttpModule],
  providers: [PostService, PostDoa, Jwt],
  controllers: [PostController],
})
export class PostModule {}
