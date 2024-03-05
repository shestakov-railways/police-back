import { Test, TestingModule } from '@nestjs/testing';
import { ReportImagesService } from './report_images.service';

describe('ReportImagesService', () => {
  let service: ReportImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportImagesService],
    }).compile();

    service = module.get<ReportImagesService>(ReportImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
