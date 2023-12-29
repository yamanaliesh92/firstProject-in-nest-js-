import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { Express } from 'express';
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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthGuard } from './shared/authguard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegiseterRes } from './dto/regiseter.res';
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
  @ApiResponse({ type: RegiseterRes, description: 'test regiseter in swagger' })
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
    await this.userser.delete(id);
    return `user ${id} is deleteing`;
  }

  @UseGuards(AuthGuard())
  @Put('update')
  async updatename(@Body() body: updateUserDto) {
    await this.userser.updateName(body);
    return ` update username is  is done`;
  }

  @ApiResponse({ type: ResForgetPassword })
  @ApiOperation({ summary: 'test forgetPassword' })
  @Patch('forget')
  async forget(@Body() body: ForgetPasswordDto) {
    return await this.userser.forgetPassword(body);
  }

  @ApiOperation({ summary: 'test restpasswor' })
  @ApiResponse({ description: 'restin swagger' })
  @Patch('rest')
  async RestPAsswod(@Body() body: RestPassword) {
    return await this.userser.RestPassword(body);
  }

  @UseGuards(AuthGuard())
  @Patch('update/patch')
  @UseInterceptors(FileInterceptor('image'))
  async updateimag(@UploadedFile() file) {
    console.log('lfllf', { file });
    await this.userser.uplodImg(file);
    return ` your username  is uploading is succesful`;
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async getUser() {
    return await this.userser.getuser();
  }

  @UseGuards(AuthGuard())
  @Get('all/user')
  async getAllUser(@Query() query: PgationUserDto) {
    return await this.userser.getAll(query);
  }

  // @UseGuards(AuthGuqrd())
  // @Put('put/:id')
  // async deleteUser(@Param('id') id: number) {
  //   return await this.userser.follow(id);
  // }
}
