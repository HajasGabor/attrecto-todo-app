import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredUserController } from './registered-user.controller';

describe('RegisteredUserController', () => {
  let controller: RegisteredUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisteredUserController],
    }).compile();

    controller = module.get<RegisteredUserController>(RegisteredUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
