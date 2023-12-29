import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from 'src/user/shared/jsonWebToken';
import { InfoController } from './info.controller';
import { Info } from './info.entity';
import { InfoService } from './info.service';
import { InfoDoa } from './shared/infodao';

@Module({
  imports: [TypeOrmModule.forFeature([Info])],
  providers: [InfoService, InfoDoa, Jwt],
  controllers: [InfoController],
})
export class InfoModule {}
