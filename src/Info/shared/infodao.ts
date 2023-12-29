import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Info } from '../info.entity';

interface Iupdate {
  where: FindOptionsWhere<Info>;
  update: QueryDeepPartialEntity<Info>;
}

@Injectable()
export class InfoDoa {
  constructor(
    @InjectRepository(Info)
    private readonly infoEntity: Repository<Info>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during infodoa');
    throw err;
  }

  async save(date: Info) {
    try {
      return await this.infoEntity.save(date);
    } catch (err) {
      Logger.log('error occured in save');
      this.handelError(err);
    }
  }
  async update(opt: Iupdate) {
    try {
      return await this.infoEntity.update(opt.where, opt.update);
    } catch (err) {
      Logger.log('error occured in update');
      this.handelError(err);
    }
  }
  async findone(where: FindOptionsWhere<Info>) {
    try {
      return await this.infoEntity.findOneOrFail({ where: where });
    } catch (err) {
      Logger.log('error occured in finddoa');
      this.handelError(err);
    }
  }
  async delete(where: FindOptionsWhere<Info>) {
    try {
      return await this.infoEntity.delete(where);
    } catch (err) {
      Logger.log('error occured in delete');
      this.handelError(err);
    }
  }
}
