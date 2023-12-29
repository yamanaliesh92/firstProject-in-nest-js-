import { Injectable, InternalServerErrorException } from '@nestjs/common';

export class MockJwt {
  async sign() {
    throw new InternalServerErrorException('sabsv');
  }

  decode() {
    throw new InternalServerErrorException('sabsv');
  }
}
