import { Test, TestingModule } from '@nestjs/testing';

import { expect } from '@jest/globals';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Followe } from '../follow.entity';
import { Role, State, User } from 'src/user/user.entity';
import { FollowDao } from './follow.doa';
import { UserDoa } from 'src/user/shared/user.doa';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { Post } from 'src/post/post.entity';
import { Info } from 'src/Info/info.entity';
import { Like } from 'src/like/like.entity';
import { faker } from '@faker-js/faker';

describe('test info server', () => {
  let foollowDao: FollowDao;
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
      providers: [FollowDao, UserDoa],
    }).compile();

    foollowDao = await app.resolve<FollowDao>(FollowDao);
    userDao = await app.resolve<UserDoa>(UserDoa);
  });

  describe('test', () => {
    it('testOne ', async () => {
      const loginMock = CreateUserDto.dtoCreate();
      const logintwo = CreateUserDto.dtoCreate();

      const twoUser = new User({
        email: loginMock.email,
        password: loginMock.password,
        username: loginMock.username,
        role: Role.USER,
        state: State.ACTIVE,
      });

      const resultTwoUser = await userDao.save(twoUser);
      const user = new User({
        email: logintwo.email,
        password: logintwo.password,
        username: logintwo.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const result = await userDao.save(user);

      const follow = new Followe({
        followerId: result.id,
        followingId: resultTwoUser.id,
      });
      const resultFollow = await foollowDao.save(follow);

      const get = await foollowDao.findone({ id: resultFollow.id });
      expect(resultFollow.id).toEqual(get.id);
    });
  });
});
