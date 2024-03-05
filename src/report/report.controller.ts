import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './create-report.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }
}