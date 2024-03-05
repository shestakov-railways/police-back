import { Module } from '@nestjs/common';
import { AdditionalInfoController } from './additional-info.controller';

@Module({
  controllers: [AdditionalInfoController]
})
export class AdditionalInfoModule {}
