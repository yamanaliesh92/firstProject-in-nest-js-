import { MailtrapEmailService } from '../email/mail-trap-email.service';
import { REQUEST } from '@nestjs/core';
import { updateUserDto } from './dto/updateUser.dto';
import { IRequest } from './shared/authguard';
import { CreateUserDto } from './dto/createUser.dto';

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { UserDoa } from './shared/user.doa';
import { Role, State, TokenSecret, User } from './user.entity';
import { Bcrypt } from './shared/bcrypt';
import { loginUserDto } from './dto/login.dto';

import { IPayload, Jwt } from './shared/jsonWebToken';
import { RegiseterRes } from './dto/regiseter.res';
import { loginRes } from './dto/login.res';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { randomBytes } from 'crypto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { RestPassword } from './dto/restPassword.dto';
import { isAfter, parseISO } from 'date-fns';
import { ResForgetPassword } from './dto/forgetPassword.res';
import { PgationUserDto } from './dto/user.pagenation.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userdoa: UserDoa,
    private readonly bc: Bcrypt,
    private readonly jwt: Jwt,
    private readonly email: EmailService,
    @Inject(REQUEST)
    private readonly req: IRequest,

    private readonly httpService: HttpService,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occured in user Service');
    throw err;
  }

  private getSecret() {
    return randomBytes(30).toString('hex');
  }

  async forgetPassword(dto: ForgetPasswordDto) {
    try {
      const secretObj = this.getSecret();
      const secret = new TokenSecret(secretObj);

      await this.userdoa.update({
        where: { email: dto.email },
        update: { secret: secret },
      });
      const result = new ResForgetPassword({
        email: dto.email,
        secret: secret as any,
      });
      return { result };
    } catch (err) {
      Logger.log('error occured during ForgetPassworod', err);
      this.handelError(err);
    }
  }

  async RestPassword(dto: RestPassword) {
    try {
      const { email, password, secret } = dto;
      const find = await this.userdoa.findone({ email: email });
      if (secret !== find.secret.value) {
        Logger.log('is diffrent', { secret });
        throw new BadRequestException('some thing went wrong try again');
      }
      const expire = parseISO(find.secret.exprieAt as any);
      const vaild = isAfter(expire, Date.now());
      if (vaild) {
        await this.userdoa.update({
          where: { email: email },
          update: {
            password: await this.bc.hashPassword(password),
          },
        });
        return 'change Password is done';
      }
    } catch (err) {
      Logger.log('error occured during restPassworod', err);
      this.handelError(err);
    }
  }

  async getuser() {
    try {
      const userId = this.req.user.id;

      return await this.userdoa.findone({ id: userId });
    } catch (err) {
      this.handelError(err);
    }
  }

  async updateName(dto: updateUserDto) {
    try {
      const userId = this.req.user.id;
      const result = await this.userdoa.update({
        where: { id: userId },
        update: { username: dto.username },
      });
      if (result.affected === 0) {
        throw new BadRequestException('no usernameaffected');
      }

      return result;
    } catch (err) {
      Logger.log('error occured during in updateName', { err });
      this.handelError(err);
    }
  }

  async delete(id: number) {
    try {
      const result = await this.userdoa.delete({ id: id });
      if (result.affected === 0) {
        throw new InternalServerErrorException('no affected in databus');
      }
      return result;
    } catch (err) {
      Logger.log('error occured in deleteUser');
      this.handelError(err);
    }
  }

  async getEmail(email: string) {
    try {
      return await this.userdoa.findone({ email: email });
    } catch (err) {
      Logger.log('error occured in getEmail');
      this.handelError(err);
    }
  }

  async uplodImg(img: any) {
    try {
      const formData = new URLSearchParams();
      formData.set('image', img.buffer?.toString('base64'));

      const userId = this.req.user.id;

      console.log('dlld', { fkk: img, i: img?.buffer?.toString('base64') });

      const { data } = await lastValueFrom(
        this.httpService.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          formData,
        ),
      );
      console.log('dl;dlldld', { data });

      const update = await this.userdoa.update({
        where: { id: userId },
        update: { image: data.data.display_url as any },
      });
      if (update.affected === 0) {
        throw new BadRequestException('please try again');
      }
      return update;
    } catch (err) {
      this.handelError(err);
    }
  }

  async login(dto: loginUserDto) {
    try {
      const user = await this.getEmail(dto.email);
      if (!user) {
        Logger.log('email', { user });
        throw new BadRequestException(
          'some thing went wrong in email or password',
        );
      }
      const passwordCorrect = await this.bc.comparePassword(
        dto.password,
        user.password,
      );

      if (!passwordCorrect) {
        Logger.log('password', { passwordCorrect });
        throw new BadRequestException(
          'some thing went wrong in email or password',
        );
      }
      const payload: IPayload = {
        id: user.id,
        role: user.role,
        state: user.state,
      };
      const token = await this.jwt.sign(payload);
      const result = new loginRes({ token: token });
      return result;
    } catch (err) {
      Logger.log('error occured in getEmail', { err });
      this.handelError(err);
    }
  }

  async register(dto: CreateUserDto, img: any) {
    try {
      const formData = new URLSearchParams();
      formData.append('email', dto.email);
      formData.append('password', dto.password);
      formData.append('email', dto.username);
      formData.set('image', img);

      console.log('dlld', {
        fkk: img,
        i: img?.buffer?.toString('base64'),
      });

      const { data } = await lastValueFrom(
        this.httpService.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          formData,
        ),
      );
      const user = new User({
        username: dto.username,
        email: dto.email,
        image: data.data.display_url as any,
        password: await this.bc.hashPassword(dto.password),
        role: Role.USER,
        state: State.ACTIVE,
      });

      const users = await this.userdoa.save(user);

      const payload: IPayload = {
        id: user.id,
        role: user.role,
        state: user.state,
      };
      const token = await this.jwt.sign(payload);

      const result = new RegiseterRes({ user: users, token: token });

      return result;
    } catch (err) {
      Logger.log('err', err);
      this.handelError(err);
    }
  }
  async getAll(dto: PgationUserDto) {
    try {
      return await this.userdoa.find({
        pagenation: { page: dto.page, limit: dto.limit },
      });
    } catch (err) {
      this.handelError(err);
    }
  }
  // async follow(id: number) {
  //   try {
  //     const userId = this.req.user.id;
  //     const get = await this.userdoa.findone({ id: id });
  //     Logger.log('get', { get });
  //     Logger.log('userID', { userId });
  //     if (!get.follower.includes(userId)) {
  //       // const follwer = await this.userent
  //       //   .createQueryBuilder()
  //       //   .update(User)
  //       //   .set({
  //       //     followeing: () => `array_append(followeing,${id})`,
  //       //   })
  //       //   .where('id = :id', { id })
  //       //   .execute();
  //       // Logger.log('Fff', { follwer });
  //       const follweing = await this.userent
  //         .createQueryBuilder()
  //         .update(User)
  //         .set({
  //           follower: () => `array_append(follower,${userId})`,
  //         })

  //         .execute();
  //     }
  //   } catch (err) {
  //     this.handelError(err);
  //   }
  // }
}
