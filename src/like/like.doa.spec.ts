import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followe } from 'src/follow/follow.entity';
import { Info } from 'src/Info/info.entity';
import { createPostDto } from 'src/post/dto/creatPost.dto';
import { Post } from 'src/post/post.entity';
import { PostDoa } from 'src/post/shared/post.dao';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserDoa } from 'src/user/shared/user.doa';
import { Role, State, User } from 'src/user/user.entity';
import { Like } from './like.entity';
import { LikeDoa } from './shared/liker.doa';
import { expect } from '@jest/globals';

describe('test likeDao', () => {
  let likeDoa: LikeDoa;
  let userDao: UserDoa;
  let postDao: PostDoa;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5438,
          username: 'test',
          password: 'test',
          database: 'testIntegeration',
          entities: [Followe, User, Post, Info, Like],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Followe, User, Post, Info, Like]),
      ],
      providers: [LikeDoa, UserDoa, PostDoa],
    }).compile();

    likeDoa = await app.resolve<LikeDoa>(LikeDoa);
    userDao = await app.resolve<UserDoa>(UserDoa);
    postDao = await app.resolve<PostDoa>(PostDoa);
  });

  describe('crateLike', () => {
    it('creatttttttttt', async () => {
      const bodyUser = CreateUserDto.dtoCreate();
      const bodyPost = createPostDto.mockCreatePostDto();
      const saveUser = new User({
        email: bodyUser.email,
        password: bodyUser.password,
        username: bodyUser.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const user = await userDao.save(saveUser);

      const savePost = new Post({
        userId: user.id,
        title: bodyPost.title,
        desc: bodyPost.desc,
      });
      const post = await postDao.save(savePost);

      const saveLiek = new Like({
        postId: post.id,
        userId: post.id,
      });
      const like = await likeDoa.save(saveLiek);

      const getLike = await likeDoa.findone({ id: like.id });

      expect(getLike.id).toEqual(like.id);
    });
  });

  describe('deleteLike', () => {
    it('delete', async () => {
      const bodyUser = CreateUserDto.dtoCreate();
      const bodyPost = createPostDto.mockCreatePostDto();
      const saveUser = new User({
        email: bodyUser.email,
        password: bodyUser.password,
        username: bodyUser.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const user = await userDao.save(saveUser);

      const savePost = new Post({
        userId: user.id,
        title: bodyPost.title,
        desc: bodyPost.desc,
      });
      const post = await postDao.save(savePost);

      const saveLiek = new Like({
        postId: post.id,
        userId: post.id,
      });
      const like = await likeDoa.save(saveLiek);

      expect(async () =>
        userDao.delete({ id: like.id }),
      ).rejects.toThrowError();
    });
  });
});
