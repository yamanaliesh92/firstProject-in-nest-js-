import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateInfoDto } from './dto/createInfo.dto';
import { CreateInfoRes } from './dto/resCrateInfo.res';
import { UpdateInfoDto } from './dto/updateInfo.dto';
import { Info } from './info.entity';
import { InfoDoa } from './shared/infodao';
@Injectable()
export class InfoService {
  constructor(private readonly infodao: InfoDoa) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during infodoa');
    throw err;
  }

  async createInfo(dto: CreateInfoDto, userId: number): Promise<CreateInfoRes> {
    try {
      const info = new Info({
        userId: userId,
        livesIn: dto.livesIn,
        workAt: dto.workAt,
        country: dto.country,
        relationShip: dto.relationShip,
      });
      const savede = await this.infodao.save(info);
      const result = new CreateInfoRes({ info: savede });
      return result;
    } catch (err) {
      Logger.log('Error ocurred during createInfo', { err });
      this.handelError(err);
    }
  }

  async getInfo(userId: number): Promise<Info> {
    try {
      return await this.infodao.findone({ userId: userId });
    } catch (err) {
      Logger.log('Error ocurred during getOwnInfo', { err });
      this.handelError(err);
    }
  }

  async updateInfo(dto: UpdateInfoDto, userId: number) {
    try {
      dto.country ? { country: dto.country } : {};
      dto.livesIn ? { livesIn: dto.livesIn } : {};
      dto.workAt ? { workAt: dto.workAt } : {};
      dto.relationShip ? { relationShip: dto.relationShip } : {};
      const result = await this.infodao.update({
        where: { userId: userId },
        update: {
          workAt: dto.workAt,
          country: dto.country,
          livesIn: dto.livesIn,
          relationShip: dto.relationShip,
        },
      });
      if (result.affected == 0) {
        throw new BadRequestException('no affected');
      }
      return result;
    } catch (err) {
      Logger.log('Error ocurred during getOwnInfo', { err });
      this.handelError(err);
    }
  }
}
