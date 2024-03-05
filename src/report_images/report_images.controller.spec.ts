import { Test, TestingModule } from '@nestjs/testing';
import { ReportImagesController } from './report_images.controller';

describe('ReportImagesController', () => {
  let controller: ReportImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportImagesController],
    }).compile();

    controller = module.get<ReportImagesController>(ReportImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
