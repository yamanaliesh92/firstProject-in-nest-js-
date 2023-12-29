import { faker } from '@faker-js/faker';
import { expect } from '@jest/globals';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Jwt } from 'src/user/shared/jsonWebToken';
import { Role, State, User } from 'src/user/user.entity';
import { createPostDto } from './dto/creatPost.dto';
import { PostController } from './post.contrroler';
import { PostService } from './post.service';

export class postMocked {
  createPost(dto: createPostDto) {
    throw new InternalServerErrorException('create Post');
  }
}

describe('test in post', () => {
  let postservice: PostService;
  let postcontroller: PostController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{ provide: PostService, useClass: postMocked }, Jwt],
    }).compile();

    postcontroller = app.get<PostController>(PostController);
    postservice = app.get<PostService>(PostService);
  });
  describe('test createPost', () => {
    it('testCreatePost', async () => {
      const userId = 1;
      const desc = faker.datatype.string();
      const title = faker.name.firstName();
      const body = { userId, desc, title };

      const createAt = new Date();
      const updateAt = new Date();
      const id = 3;
      const username = faker.name.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      //   const id = faker.datatype.number();
      const role = faker.helpers.arrayElement(Object.values(Role));
      const state = faker.helpers.arrayElement(Object.values(State));
      // const follower = [1];
      // const followeing = [2, 1];
      //   const createAt = new Date();
      //   const updateAt = new Date();
      const user = {
        email,
        password,
        username,
        id,
        role,
        state,

        createAt,
        updateAt,
      };

      const post = { desc, title, userId, createAt, user, updateAt, id };
      const createService = jest
        .spyOn(postservice, 'createPost')
        .mockResolvedValue(post);
      const postControllers = await postcontroller.createPost(body);
      expect(postControllers).toEqual(post);
    });
  });
});
