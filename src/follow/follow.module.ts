import { FollowController } from './follow.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from 'src/user/shared/jsonWebToken';
import { Follow } from './follow.entity';
import { FollowService } from './followe.service';
import { FollowDao } from './shared/follow.doa';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), HttpModule],
  providers: [Jwt, FollowService, FollowDao],
  controllers: [FollowController],
})
export class FollowModule {}
