import { InternalServerErrorException } from '@nestjs/common';

export class InfoDoaMock {
  async save() {
    throw new InternalServerErrorException('error ');
  }
  async update() {
    throw new InternalServerErrorException('error ');
  }
  async findone() {
    throw new InternalServerErrorException('error ');
  }
  async delete() {
    throw new InternalServerErrorException('error ');
  }
}
