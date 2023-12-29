import { InternalServerErrorException } from '@nestjs/common';

export class MockBcrypt {
  async hashPassword() {
    throw new InternalServerErrorException('d');
  }

  async comparePassword() {
    throw new InternalServerErrorException('sabsv');
  }
}
