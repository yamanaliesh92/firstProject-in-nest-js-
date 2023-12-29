import 'jest';

import { MockJwt } from './../mocks/jwt.service.mock';

import { Test, TestingModule } from '@nestjs/testing';
import { Jwt } from './shared/jsonWebToken';
import { UserDoa } from './shared/user.doa';
import { User } from './user.entity';
import { expect } from '@jest/globals';
import { UserService } from './user.service';
import { Bcrypt } from './shared/bcrypt';

import { HttpModule } from '@nestjs/axios';
import { MockUserDoa } from '../mocks/user.dao.mock';
import { DeleteResult, UpdateResult } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { MockBcrypt } from 'src/mocks/bcrypt.service.mock';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from './dto/createUser.dto';
import { loginUserDto } from './dto/login.dto';
import { loginRes } from './dto/login.res';

describe('userService', () => {
  let userService: UserService;
  let userDoa: UserDoa;
  let bc: Bcrypt;
  let jwt: Jwt;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useClass: MockUserDoa },
        { provide: Bcrypt, useClass: MockBcrypt },
        { provide: Jwt, useClass: MockJwt },
        { provide: REQUEST, useValue: { user: User.mock() } },
        UserService,
      ],
      imports: [HttpModule],
    }).compile();

    userDoa = await app.resolve<UserDoa>(UserDoa);
    bc = await app.resolve<Bcrypt>(Bcrypt);
    jwt = await app.resolve<Jwt>(Jwt);
    userService = await app.resolve<UserService>(UserService);
  });

  describe('delete', () => {
    it('teest delete Serivcer', async () => {
      const mock = User.mock();
      jest.spyOn(userDoa, 'delete').mockResolvedValue({} as DeleteResult);
      const result = await userService.delete(mock.id);
      expect(result).toBeDefined();
      expect(result).toEqual({} as DeleteResult);
    });
  });

  describe('delete with 500', () => {
    it('delete', async () => {
      const mock = User.mock();
      jest
        .spyOn(userDoa, 'delete')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () => userService.delete(mock.id)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const mock = User.mock();
    it('updateService', async () => {
      jest.spyOn(userDoa, 'update').mockResolvedValue({} as UpdateResult);

      const result = await userService.updateName({ username: mock.username });
      expect(result).toBeDefined();
      expect(result).toEqual({} as UpdateResult);
    });
  });

  describe('update with 400', () => {
    it('update BadRequest', async () => {
      const mock = User.mock();
      jest
        .spyOn(userDoa, 'update')
        .mockRejectedValue(new BadRequestException());

      expect(async () =>
        userService.updateName({ username: mock.username }),
      ).rejects.toThrowError();
    });
  });

  describe('s', () => {
    it('findone', async () => {
      const mock = User.mock();
      jest.spyOn(userDoa, 'findone').mockResolvedValue(mock);

      const result = await userService.getEmail(mock.email);

      expect(result).toEqual(mock);
      expect(result).toBeDefined();
    });
  });

  describe('findUser with 404', () => {
    it('findUser with notFound ', async () => {
      const mock = User.mock();
      jest.spyOn(userDoa, 'findone').mockRejectedValue(new NotFoundException());
      expect(async () =>
        userService.getEmail(mock.email),
      ).rejects.toThrowError();
    });
  });

  describe('register', () => {
    it('createService', async () => {
      const mock = User.mock();
      const body = CreateUserDto.dtoCreate();
      jest.spyOn(bc, 'hashPassword').mockResolvedValue(mock.password);
      jest.spyOn(jwt, 'sign').mockResolvedValue({} as string);

      jest.spyOn(userDoa, 'save').mockResolvedValue(mock);
      const result = await userService.register(body);
      expect(result).toBeDefined();
    });
  });

  describe('handles error', () => {
    it('when dao.save fails', async () => {
      const mock = User.mock();

      jest.spyOn(bc, 'hashPassword').mockResolvedValue(mock.password);
      jest.spyOn(jwt, 'sign').mockResolvedValue(faker.datatype.string());

      jest
        .spyOn(userDoa, 'save')
        .mockRejectedValue(new InternalServerErrorException());

      expect(async () => userService.register(mock)).rejects.toThrowError();
    });
  });

  describe('error', () => {
    it('register with 500', async () => {
      const mock = User.mock();
      const body = CreateUserDto.dtoCreate();
      const password = faker.datatype.json();
      jest.spyOn(bc, 'hashPassword').mockResolvedValue(password);
      jest.spyOn(userDoa, 'save').mockResolvedValue(mock);
      jest
        .spyOn(jwt, 'sign')
        .mockRejectedValue(new InternalServerErrorException());

      expect(async () => userService.register(body)).rejects.toThrowError();
    });
  });

  describe('regiseter with 500', () => {
    it('regiseter with error from hashpassword', async () => {
      const token = faker.datatype.json();
      const mock = User.mock();
      const body = CreateUserDto.dtoCreate();
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest.spyOn(userDoa, 'save').mockResolvedValue(mock);
      jest
        .spyOn(bc, 'hashPassword')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () => userService.register(body)).rejects.toThrowError();
    });
  });

  describe('login with 200', () => {
    it('login with sucessful', async () => {
      const mock = User.mock();

      const mockLogin = loginUserDto.mockBodyLogin();
      const token = faker.datatype.json();
      jest.spyOn(userDoa, 'findone').mockResolvedValue(mock);
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
      const result = await userService.login(mockLogin);
      expect(result).toBeDefined();
    });
  });

  describe('login with 404 ', () => {
    it('login with not found user', async () => {
      const mock = User.mock();
      const LoginRes = loginRes.mockResLLogin();
      const mockLogin = loginUserDto.mockBodyLogin();
      const token = faker.datatype.json();
      jest.spyOn(userDoa, 'findone').mockRejectedValue(new NotFoundException());
      jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      expect(async () => userService.login(mockLogin)).rejects.toThrowError();
    });
  });

  describe('login with 500', () => {
    it('login with failed hashPassword', async () => {
      const mock = User.mock();

      const logindto = loginUserDto.mockBodyLogin();
      const token = faker.datatype.json();
      jest.spyOn(userDoa, 'findone').mockResolvedValue(mock);
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest
        .spyOn(bc, 'comparePassword')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () => userService.login(logindto)).rejects.toThrowError();
    });
  });

  describe('login with 500 also', () => {
    it('login with internalServerError in failde Token', async () => {
      const mock = User.mock();
      const logindto = loginUserDto.mockBodyLogin();

      jest.spyOn(bc, 'comparePassword').mockResolvedValue(true);
      jest.spyOn(userDoa, 'findone').mockResolvedValue(mock);
      jest
        .spyOn(jwt, 'sign')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () => userService.login(logindto)).rejects.toThrowError();
    });
  });
});
