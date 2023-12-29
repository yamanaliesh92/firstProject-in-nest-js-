import { LikerService } from './like.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from '../user/shared/jsonWebToken';
import { LikeController } from './like.controller';
import { Like } from './like.entity';
import { LikeDoa } from './shared/liker.doa';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [Jwt, LikeDoa, LikerService],
  controllers: [LikeController],
})
export class LikeModule {}
