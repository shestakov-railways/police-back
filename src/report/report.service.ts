import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './create-report.dto';
import { Criminal } from '../criminal/criminal.entity';
import { Image } from '../report_images/report_images.entity';
import { AdditionalInfo } from '../additional-info/additional-info.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepository: Repository<Report>,
        
        @InjectRepository(Criminal)
        private criminalRepository: Repository<Criminal>,

        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,

        @InjectRepository(AdditionalInfo)
        private readonly additionalInfoRepository: Repository<AdditionalInfo>,
    ) {}

    async create(createReportDto: CreateReportDto): Promise<Report> {
        const report = this.reportRepository.create(createReportDto);

        if (createReportDto.criminals) {
            const criminals = await Promise.all(createReportDto.criminals.map(async (criminalDto) => {
                const criminal = this.criminalRepository.create(criminalDto);
                
                if (criminalDto.additional) {
                    const additionalInfos = await Promise.all(criminalDto.additional.map(async (additionalInfoDto) => {
                        const additionalInfo = this.additionalInfoRepository.create(additionalInfoDto);
                        await this.additionalInfoRepository.save(additionalInfo);
                        return additionalInfo;
                    }));
                    criminal.additional = additionalInfos;
                }
    
                await this.criminalRepository.save(criminal);
                return criminal;
            }));
            report.criminals = criminals;
        }
    
        if (createReportDto.images) {
            const images = createReportDto.images.map(imageData => this.imageRepository.create({ data: imageData }));
            report.images = await Promise.all(images.map(image => this.imageRepository.save(image)));
        }

        return this.reportRepository.save(report);
    }
}