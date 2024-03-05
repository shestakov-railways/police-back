import { Module } from '@nestjs/common';
import { ReportImagesService } from './report_images.service';
import { ReportImagesController } from './report_images.controller';

@Module({
  providers: [ReportImagesService],
  controllers: [ReportImagesController]
})
export class ReportImagesModule {}
