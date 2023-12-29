import { MailtrapEmailService } from '../email/mail-trap-email.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDoa } from './shared/user.doa';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Bcrypt } from './shared/bcrypt';
import { Jwt } from './shared/jsonWebToken';
import { HttpModule } from '@nestjs/axios';
import { Followe } from 'src/follow/follow.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Followe]), HttpModule, EmailModule],
  providers: [UserDoa, UserService, Bcrypt, Jwt, MailtrapEmailService],
  controllers: [UserController],
})
export class UserModule {}
