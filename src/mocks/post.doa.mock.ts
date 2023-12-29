import { InternalServerErrorException } from '@nestjs/common';

export class PostDoaMock {
  async save() {
    throw new InternalServerErrorException('sa');
  }
  async update() {
    throw new InternalServerErrorException('sqqa');
  }
  async findone() {
    throw new InternalServerErrorException('saaa');
  }
  async delete() {
    throw new InternalServerErrorException('sass');
  }
  async find() {
    throw new InternalServerErrorException('sass');
  }
}
