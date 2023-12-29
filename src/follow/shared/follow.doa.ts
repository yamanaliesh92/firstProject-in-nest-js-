import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, FindOptionsWhere } from 'typeorm';

import { Followe } from '../follow.entity';

@Injectable()
export class FollowDao {
  constructor(
    @InjectRepository(Followe)
    private readonly followEntity: Repository<Followe>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during userdoa');
    throw err;
  }

  async save(data: Followe) {
    try {
      return await this.followEntity.save(data);
    } catch (err) {
      Logger.log('Error occured during save date in follow', { err });
      throw new InternalServerErrorException('try again ');
    }
  }

  async delete(where: FindOptionsWhere<Followe>) {
    try {
      return await this.followEntity.delete(where);
    } catch (err) {
      Logger.log('Error occured during getFollow in follow', { err });
      throw new InternalServerErrorException('try again ');
    }
  }

  async findone(where: FindOptionsWhere<Followe>) {
    try {
      return await this.followEntity.findOneOrFail({
        where: where,
        relations: { following: true },
      });
    } catch (err) {
      Logger.log('Error occured during getFollow in follow', { err });
      throw new InternalServerErrorException('try again ');
    }
  }
  async find(where: FindOptionsWhere<Followe>) {
    try {
      return await this.followEntity.find({
        where: where,
        relations: { following: true },
      });
    } catch (err) {
      Logger.log('Error occured during getAllFollow in follow', { err });
      throw new InternalServerErrorException('try again ');
    }
  }
}
