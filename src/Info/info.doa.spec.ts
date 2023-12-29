import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followe } from 'src/follow/follow.entity';
import { Post } from 'src/post/post.entity';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserDoa } from 'src/user/shared/user.doa';
import { Role, State, User } from 'src/user/user.entity';
import { CreateInfoDto } from './dto/createInfo.dto';
import { Info } from './info.entity';
import { InfoDoa } from './shared/infodao';
import { expect } from '@jest/globals';
import { Like } from 'src/like/like.entity';
import { UpdateInfoDto } from './dto/updateInfo.dto';

describe('test infoDao', () => {
  let infoDao: InfoDoa;
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
      providers: [InfoDoa, UserDoa],
    }).compile();

    infoDao = await app.resolve<InfoDoa>(InfoDoa);
    userDao = await app.resolve<UserDoa>(UserDoa);
  });

  describe('testCreateInfo', () => {
    it('teessssst', async () => {
      const bodyInfo = CreateInfoDto.mockCreateInfoDto();
      const bodyUser = CreateUserDto.dtoCreate();
      const saveUser = new User({
        email: bodyUser.email,
        password: bodyUser.password,
        username: bodyUser.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const user = await userDao.save(saveUser);

      const saveInfo = new Info({
        userId: user.id,
        workAt: bodyInfo.workAt,
        country: bodyInfo.country,
        relationShip: bodyInfo.relationShip,
        livesIn: bodyInfo.livesIn,
      });

      const info = await infoDao.save(saveInfo);

      const getInfo = await infoDao.findone({ id: info.id });

      expect(getInfo.id).toEqual(info.id);
    });
  });

  describe('testupdateInfo', () => {
    it('Teeeeeeeest update', async () => {
      const bodyInfo = CreateInfoDto.mockCreateInfoDto();
      const bodyUser = CreateUserDto.dtoCreate();
      const saveUser = new User({
        email: bodyUser.email,
        password: bodyUser.password,
        username: bodyUser.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const user = await userDao.save(saveUser);

      const saveInfo = new Info({
        userId: user.id,
        workAt: bodyInfo.workAt,
        country: bodyInfo.country,
        relationShip: bodyInfo.relationShip,
        livesIn: bodyInfo.livesIn,
      });

      const info = await infoDao.save(saveInfo);

      const bodyUpdateInfo = UpdateInfoDto.mockUpdateInfoDto();

      const updateInfo = await infoDao.update({
        where: { id: info.id },
        update: { workAt: bodyUpdateInfo.workAt },
      });
      const getInfo = await infoDao.findone({ id: info.id });

      expect(getInfo.workAt).toEqual(bodyUpdateInfo.workAt);
    });
  });

  describe('deleteInfo', () => {
    it('deleteddddddddd', async () => {
      const bodyInfo = CreateInfoDto.mockCreateInfoDto();
      const bodyUser = CreateUserDto.dtoCreate();
      const saveUser = new User({
        email: bodyUser.email,
        password: bodyUser.password,
        username: bodyUser.username,
        role: Role.USER,
        state: State.ACTIVE,
      });
      const user = await userDao.save(saveUser);

      const saveInfo = new Info({
        userId: user.id,
        workAt: bodyInfo.workAt,
        country: bodyInfo.country,
        relationShip: bodyInfo.relationShip,
        livesIn: bodyInfo.livesIn,
      });

      const info = await infoDao.save(saveInfo);

      expect(async () =>
        infoDao.delete({ id: info.id }),
      ).rejects.toThrowError();
    });
  });
});
