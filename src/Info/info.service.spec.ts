import { faker } from '@faker-js/faker';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { InfoDoaMock } from 'src/mocks/info.doa.mock';
import { MockJwt } from 'src/mocks/jwt.service.mock';
import { Jwt } from 'src/user/shared/jsonWebToken';
import { expect } from '@jest/globals';
import { CreateInfoDto } from './dto/createInfo.dto';
import { Info } from './info.entity';
import { InfoService } from './info.service';
import { InfoDoa } from './shared/infodao';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('test info server', () => {
  let infodoa: InfoDoa;
  let insoServcie: InfoService;
  let jwt: Jwt;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: InfoDoa, useClass: InfoDoaMock },
        { provide: Jwt, useClass: MockJwt },
        { provide: REQUEST, useValue: { user: Info.mockInfo() } },
        InfoService,
      ],
    }).compile();

    infodoa = await app.resolve<InfoDoa>(InfoDoa);
    jwt = await app.resolve<Jwt>(Jwt);

    insoServcie = await app.resolve<InfoService>(InfoService);
  });

  describe('crate Info with succressful', () => {
    it('create Info with 201', async () => {
      const mock = Info.mockInfo();
      const mockCreateInfoDto = CreateInfoDto.mockCreateInfoDto();

      jest.spyOn(infodoa, 'save').mockResolvedValue(mock);

      const result = await insoServcie.createInfo(mockCreateInfoDto, 2);
      expect(result).toBeDefined();
    });
  });

  describe('crateInfo with 500', () => {
    it('crateInfo with failed in save', async () => {
      const mockCreateInfoDto = CreateInfoDto.mockCreateInfoDto();
      const token = faker.datatype.string();
      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest
        .spyOn(infodoa, 'save')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () =>
        insoServcie.createInfo(mockCreateInfoDto, 2),
      ).rejects.toThrowError(new InternalServerErrorException());
    });
  });

  describe('crateInfo with 400', () => {
    it('crateInfo with BadRequset', async () => {
      const mockCreateInfoDto = CreateInfoDto.mockCreateInfoDto();
      const token = faker.datatype.string();

      jest.spyOn(jwt, 'sign').mockResolvedValue(token);
      jest.spyOn(infodoa, 'save').mockRejectedValue(new BadRequestException());
      expect(async () =>
        insoServcie.createInfo(mockCreateInfoDto, 2),
      ).rejects.toThrowError();
    });
  });

  describe('getOwnInfo', () => {
    it('getOwnInfo with 200', async () => {
      const mock = Info.mockInfo();
      jest.spyOn(infodoa, 'findone').mockResolvedValue(mock);
      const result = await insoServcie.getInfo(2);
      expect(result).toBeDefined();
      expect(result).toEqual(mock);
    });
  });

  describe('getOwnInfo with 500', () => {
    it('getOwnInfo with internalserverError', async () => {
      jest
        .spyOn(infodoa, 'findone')
        .mockRejectedValue(new InternalServerErrorException());
      expect(async () => insoServcie.getInfo(2)).rejects.toThrowError();
    });
  });
});
