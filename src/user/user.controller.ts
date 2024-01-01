import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from './shared/authguard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegiseterRes as RegisterRes } from './dto/regiseter.res';
import { loginRes } from './dto/login.res';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { RestPassword } from './dto/restPassword.dto';
import { ResForgetPassword } from './dto/forgetPassword.res';
import { PgationUserDto } from './dto/user.pagenation.dto';
import { QueryFailedError } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userser: UserService) {}
  @Get()
  async get() {
    return 'hey';
  }

  @ApiOperation({ summary: 'test regiseter' })
  @ApiResponse({ type: RegisterRes, description: 'test regiseter in swagger' })
  @UseInterceptors(FileInterceptor('image'))
  @Post('sign')
  async signIn(@Body() body: CreateUserDto, @UploadedFile() file) {
    try {
      return await this.userser.register(body, file.buffer?.toString('base64'));
    } catch (err) {
      Logger.log('err', err);
      if (err instanceof QueryFailedError) {
        throw new BadRequestException('email is already exist');
      }
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  @ApiOperation({ summary: 'test login' })
  @ApiResponse({ type: loginRes, description: 'login in swagger' })
  @Post('login')
  async login(@Body() body: loginUserDto) {
    return await this.userser.login(body);
  }
  @UseGuards(AuthGuard())
  @Delete('del/:id')
  async deleteUser(@Param('id') id: number) {
    try {
      await this.userser.delete(id);
      return `user ${id} is deleting`;
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @UseGuards(AuthGuard())
  @Put('update')
  async updatename(@Body() body: updateUserDto) {
    try {
      await this.userser.updateName(body);
      return ` update username is  is done`;
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @ApiResponse({ type: ResForgetPassword })
  @ApiOperation({ summary: 'test forgetPassword' })
  @Patch('forget')
  async forget(@Body() body: ForgetPasswordDto) {
    try {
      return await this.userser.forgetPassword(body);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @ApiOperation({ summary: 'test resetpassword' })
  @Patch('rest')
  async RestPassword(@Body() body: RestPassword) {
    try {
      return await this.userser.RestPassword(body);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @UseGuards(AuthGuard())
  @Patch('update/patch')
  @UseInterceptors(FileInterceptor('image'))
  async updatingImg(@UploadedFile() file) {
    try {
      await this.userser.uplodImg(file);
      return ` your photo  is uploading is successful`;
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @UseGuards(AuthGuard())
  @ApiResponse({ type: RegisterRes })
  @Get('me')
  async getUser() {
    try {
      return await this.userser.getuser();
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }

  @UseGuards(AuthGuard())
  @ApiResponse({ type: [RegisterRes] })
  @Get('all/user')
  async getAllUser(@Query() query: PgationUserDto) {
    try {
      return await this.userser.getAll(query);
    } catch (err) {
      throw new InternalServerErrorException(
        'some thing went wrong try again please...',
      );
    }
  }
}
