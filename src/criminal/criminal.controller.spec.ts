import { Test, TestingModule } from '@nestjs/testing';
import { CriminalController } from './criminal.controller';

describe('CriminalController', () => {
  let controller: CriminalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriminalController],
    }).compile();

    controller = module.get<CriminalController>(CriminalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
