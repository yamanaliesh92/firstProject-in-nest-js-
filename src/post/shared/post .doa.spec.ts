import { Like } from '../../like/like.entity';

import { Followe } from 'src/follow/follow.entity';
import { Info } from 'src/Info/info.entity';
import { UserDoa } from 'src/user/shared/user.doa';
import { Role, State, User } from 'src/user/user.entity';
import { PostDoa } from './post.dao';
import { expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { createPostDto } from '../dto/creatPost.dto';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

import { UpdatePostDto } from '../dto/updatePost.dto';

describe('test post doa', () => {
  let postDao: PostDoa;
  let userDao: UserDoa;
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
      providers: [PostDoa, UserDoa],
    }).compile();

    postDao = await app.resolve<PostDoa>(PostDoa);
    userDao = await app.resolve<UserDoa>(UserDoa);
  });
  describe('createPost', () => {
    it('crate', async () => {
      const dtoPost = createPostDto.mockCreatePostDto();
      const loginMock = CreateUserDto.dtoCreate();
      const user = new User({
        email: loginMock.email,
        password: loginMock.password,
        username: loginMock.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const resultUser = await userDao.save(user);

      const post = new Post({
        title: dtoPost.title,
        desc: dtoPost.desc,
        userId: resultUser.id,
      });
      const resultPost = await postDao.save(post);

      const getPost = await postDao.findone({ id: resultPost.id });

      expect(getPost.id).toEqual(resultPost.id);
    });
  });
  describe('detelPost', () => {
    it('detelet test integration test', async () => {
      const dtoPost = createPostDto.mockCreatePostDto();
      const loginMock = CreateUserDto.dtoCreate();
      const user = new User({
        email: loginMock.email,
        password: loginMock.password,
        username: loginMock.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const resultUser = await userDao.save(user);

      const post = new Post({
        userId: resultUser.id,
        title: dtoPost.title,
        desc: dtoPost.desc,
      });
      const resultPost = await postDao.save(post);

      expect(
        async () => await postDao.findone({ id: resultPost.id }),
      ).rejects.toThrowError();
    });
  });

  describe('updatePost', () => {
    it('updateeeeeeeeee', async () => {
      const dtoPost = createPostDto.mockCreatePostDto();
      const loginMock = CreateUserDto.dtoCreate();
      const user = new User({
        email: loginMock.email,
        password: loginMock.password,
        username: loginMock.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const resultUser = await userDao.save(user);

      const post = new Post({
        userId: resultUser.id,
        title: dtoPost.title,
        desc: dtoPost.desc,
      });
      const resultPost = await postDao.save(post);

      const updateDto = UpdatePostDto.mockUpdatePostDto();

      const resultUpdatePost = await postDao.update({
        where: { id: resultPost.id },
        update: { title: updateDto.title },
      });
      const resultGetPost = await postDao.findone({ id: resultPost.id });

      expect(resultGetPost.title).toEqual(updateDto.title);
    });
  });
});
