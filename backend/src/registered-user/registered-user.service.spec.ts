import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredUserService } from './registered-user.service';

describe('RegisteredUserService', () => {
  let service: RegisteredUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisteredUserService],
    }).compile();

    service = module.get<RegisteredUserService>(RegisteredUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
