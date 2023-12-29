import { User } from '../user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
interface Iupdate {
  where: FindOptionsWhere<User>;
  update: QueryDeepPartialEntity<User>;
}
interface IPagnation {
  limit?: number;
  page?: number;
}

interface IFind {
  pagenation?: IPagnation;
  where?: FindOptionsWhere<User>;
}
@Injectable()
export class UserDoa {
  constructor(
    @InjectRepository(User)
    private readonly userentity: Repository<User>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during userdoa');
    throw err;
  }

  private getPagnation(dto: IPagnation) {
    try {
      if (!dto) return;
      const { limit = 7, page = 1 } = dto;
      return {
        skip: (page - 1) * limit,
        take: limit,
      };
    } catch (err) {
      Logger.log('error occured in save');
      this.handelError(err);
    }
  }
  async save(date: User) {
    try {
      const save = await this.userentity.save(date);

      const d = Object.assign({}, save);

      return d;
    } catch (err) {
      Logger.log('error occured in save', err);
      this.handelError(err);
    }
  }
  async update(opt: Iupdate) {
    try {
      return await this.userentity.update(opt.where, opt.update);
    } catch (err) {
      Logger.log('error occured in update');
      this.handelError(err);
    }
  }
  async findone(where: FindOptionsWhere<User>) {
    try {
      return await this.userentity.findOneOrFail({
        where,
        relations: { follows: true },
      });
    } catch (err) {
      Logger.log('error occured in findUser');
      this.handelError(err);
    }
  }
  async delete(where: FindOptionsWhere<User>) {
    try {
      return await this.userentity.delete(where);
    } catch (err) {
      Logger.log('error occured in delete');
      this.handelError(err);
    }
  }
  async find(dto: IFind) {
    try {
      const { pagenation, where } = dto;
      const { take, skip } = this.getPagnation(pagenation);
      return await this.userentity.find({ where, skip, take });
    } catch (err) {
      Logger.log('error occured in getUser');
      this.handelError(err);
    }
  }
}
