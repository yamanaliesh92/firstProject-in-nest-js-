import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Like } from '../like.entity';
interface Iupdate {
  where: FindOptionsWhere<Like>;
  update: QueryDeepPartialEntity<Like>;
}
@Injectable()
export class LikeDoa {
  constructor(
    @InjectRepository(Like) private readonly postentity: Repository<Like>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during userdoa');
    throw err;
  }

  async save(date: Like) {
    try {
      return await this.postentity.save(date);
    } catch (err) {
      Logger.log('error occured in save');
      this.handelError(err);
    }
  }

  async update(opt: Iupdate) {
    try {
      return await this.postentity.update(opt.where, opt.update);
    } catch (err) {
      Logger.log('error occured in update');
      this.handelError(err);
    }
  }

  async findone(where: FindOptionsWhere<Like>) {
    try {
      return await this.postentity.findOneOrFail({ where: where });
    } catch (err) {
      Logger.log('error occured in findUser');
      this.handelError(err);
    }
  }

  async delete(where: FindOptionsWhere<Like>) {
    try {
      return await this.postentity.delete(where);
    } catch (err) {
      Logger.log('error occured in delete');
      this.handelError(err);
    }
  }

  //   async count(optionsss: FindManyOptions<Like>) {
  //     try {
  //       return await this.postentity.count({where:{optionsss}});
  //     } catch (err) {
  //       Logger.log('error occured in delete');
  //       this.handelError(err);
  //     }
  //   }
}
