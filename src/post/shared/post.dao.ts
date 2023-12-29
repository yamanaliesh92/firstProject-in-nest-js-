import { Post } from './../post.entity';
import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface Iupdate {
  where: FindOptionsWhere<Post>;
  update: QueryDeepPartialEntity<Post>;
}

interface Ipagnation {
  limit?: number;
  page?: number;
}

interface IFind {
  pagation?: Ipagnation;
  where?: FindOptionsWhere<Post>;
}

@Injectable()
export class PostDoa {
  constructor(
    @InjectRepository(Post) private readonly postentity: Repository<Post>,
  ) {}

  private handelError(err: unknown) {
    Logger.log('error occuerd during userdoa');
    throw err;
  }

  private pagnationOptio(dto: Ipagnation) {
    if (!dto) return {};
    const { page = 1, limit = 9 } = dto;

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  async findAllPost(dto: IFind) {
    const { where, pagation } = dto;
    try {
      const { skip, take } = this.pagnationOptio(pagation);

      return await this.postentity.find({
        where,
        skip,
        take,
        relations: { user: true },
      });
    } catch (err) {
      Logger.log('Error occured during findPost', { err });
      this.handelError(err);
    }
  }
  async save(date: Post) {
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
  async findone(where: FindOptionsWhere<Post>) {
    try {
      return await this.postentity.findOneOrFail({ where: where });
    } catch (err) {
      Logger.log('error occured in findUser');
      this.handelError(err);
    }
  }
  async delete(where: FindOptionsWhere<Post>) {
    try {
      return await this.postentity.delete(where);
    } catch (err) {
      Logger.log('error occured in delete');
      this.handelError(err);
    }
  }
  async find(where: FindOptionsWhere<Post>) {
    try {
      return await this.postentity.find({
        where,
        relations: { likes: true },
      });
    } catch (error) {
      Logger.log('error occured in find');
      this.handelError(error);
    }
  }
}
