import { expect } from '@jest/globals';

import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockedAppService {
  getHello(): string {
    throw new Error('Unimplemented Please spy on the function');
  }
}

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useClass: MockedAppService }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const mocked = faker.name.firstName();

      const sayHelloService = jest
        .spyOn(appService, 'getHello')
        .mockReturnValue(mocked);

      const result = appController.getHello();

      expect(result).toEqual(mocked);
      expect(sayHelloService).toBeCalled();
    });
  });
});
