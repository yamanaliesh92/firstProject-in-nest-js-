import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/login.dto';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { RegiseterRes } from './dto/regiseter.res';
import { Role, State } from './user.entity';
import { expect } from '@jest/globals';

import { Jwt } from './shared/jsonWebToken';
import { loginRes } from './dto/login.res';
import { DeleteResult, UpdateResult } from 'typeorm';

class ServiceModcked {
  register(body: CreateUserDto) {
    throw new InternalServerErrorException('something');
  }
  login(body: loginUserDto) {
    throw new InternalServerErrorException('login');
  }
  delete(id: number) {
    throw new InternalServerErrorException('delete user');
  }
  updateName(body: updateUserDto) {
    throw new InternalServerErrorException('update user');
  }
  getuser() {
    throw new InternalServerErrorException('get user');
  }
}

describe('test controller', () => {
  let usercontroller: UserController;
  let userservice: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useClass: ServiceModcked }, Jwt],
    }).compile();

    usercontroller = app.get<UserController>(UserController);
    userservice = app.get<UserService>(UserService);
  });
  describe('login', () => {
    it('test login', async () => {
      const token = faker.datatype.string();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const body = { email, password };
      const result = new loginRes({ token: token });
      const loginSer = jest
        .spyOn(userservice, 'login')
        .mockResolvedValue(result);
      const logincontroller = await usercontroller.login(body);
      expect(loginSer).toBeCalled();
      expect(logincontroller).toEqual(result);
    });
  });

  describe('delete user', () => {
    it('test delete user', async () => {
      const id = 29;

      const userRepositoryDeleteSpy = jest
        .spyOn(userservice, 'delete')
        .mockResolvedValue({} as DeleteResult);

      const result = await usercontroller.deleteUser(id);

      expect(userRepositoryDeleteSpy).toHaveBeenCalledWith(id);
    });
  });
  describe('update username', () => {
    it('updateing', async () => {
      const id = 12;
      const username = 'yaman';
      const body = { username };
      const ResupdateSp = jest
        .spyOn(userservice, 'updateName')
        .mockResolvedValue({} as UpdateResult);
      const result = usercontroller.updatename(body);
      expect(ResupdateSp).toBeCalled();
    });
  });

  describe('first test in usercontroller', () => {
    it('test regiseter', async () => {
      const username = faker.name.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const id = faker.datatype.number();
      const role = faker.helpers.arrayElement(Object.values(Role));
      const state = faker.helpers.arrayElement(Object.values(State));
      const image = faker.image.food();
      // const follower = [1];
      // const followeing = [2, 1];
      const createAt = new Date();
      const updateAt = new Date();
      const Users = {
        email,
        password,
        username,
        id,
        role,
        state,
        image,

        createAt,
        updateAt,
      };
      const body = { email, password, username };
      const sign = new RegiseterRes({ user: Users });

      const loginservice = jest
        .spyOn(userservice, 'register')
        .mockResolvedValue(sign);
      const result = await usercontroller.signIn(body);
      expect(result).toEqual(sign);
      expect(loginservice).toBeCalled();
    });
  });

  describe('get user', () => {
    it('you should return user', async () => {
      const userId = 3;
      const username = faker.name.fullName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const id = faker.datatype.number();
      const image = faker.image.food();
      const role = faker.helpers.arrayElement(Object.values(Role));
      const state = faker.helpers.arrayElement(Object.values(State));
      // const follower = [1];
      // const followeing = [2, 1];
      const createAt = new Date();
      const updateAt = new Date();
      const users = {
        email,
        password,
        username,
        id,
        role,
        state,
        image,
        createAt,
        updateAt,
      };
      const ser = jest.spyOn(userservice, 'getuser').mockResolvedValue(users);
      const result = usercontroller.getUser();
      expect(ser).toBeCalled();
      expect(result).toBeCalled();
    });
  });
});
