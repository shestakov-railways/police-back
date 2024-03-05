import { Module } from '@nestjs/common';
import { CriminalService } from './criminal.service';

@Module({
  providers: [CriminalService]
})
export class CriminalModule {}
