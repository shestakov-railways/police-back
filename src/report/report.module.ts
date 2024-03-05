import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Report } from './report.entity';
import { Criminal } from '../criminal/criminal.entity';
import { Image } from '../report_images/report_images.entity';
import { AdditionalInfo } from '../additional-info/additional-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Criminal, Image, AdditionalInfo])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [TypeOrmModule, ReportService]
})
export class ReportModule {}