import { Test, TestingModule } from '@nestjs/testing';
import { GenersController } from './geners.controller';
import { GenersService } from './geners.service';

describe('GenersController', () => {
  let controller: GenersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenersController],
      providers: [GenersService],
    }).compile();

    controller = module.get<GenersController>(GenersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
