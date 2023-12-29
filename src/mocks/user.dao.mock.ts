import { InternalServerErrorException } from '@nestjs/common';

export class MockUserDoa {
  async save() {
    throw new InternalServerErrorException('sabsv');
  }

  async update() {
    throw new InternalServerErrorException('sasv');
  }

  async findone() {
    throw new InternalServerErrorException('sabsv');
  }

  async delete() {
    throw new InternalServerErrorException('as');
  }
}
