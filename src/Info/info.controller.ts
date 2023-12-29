import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard, IRequest } from 'src/user/shared/authguard';
import { CreateInfoDto } from './dto/createInfo.dto';
import { CreateInfoRes } from './dto/resCrateInfo.res';
import { UpdateInfoDto } from './dto/updateInfo.dto';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoSer: InfoService) {}

  @UseGuards(AuthGuard())
  @Post()
  @ApiOperation({ summary: 'crateinfo' })
  @ApiResponse({ type: CreateInfoRes })
  async create(@Body() body: CreateInfoDto, @Req() req: IRequest) {
    return await this.infoSer.createInfo(body, req.user.id);
  }
  @UseGuards(AuthGuard())
  @Get()
  async getOwnInfo(@Req() req: IRequest) {
    return await this.infoSer.getInfo(req.user.id);
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateOwnInfo(@Body() body: UpdateInfoDto, @Req() req: IRequest) {
    return await this.infoSer.updateInfo(body, req.user.id);
  }
}
