import { IsOptional } from 'class-validator';
import { AdditionalInfoDto } from '../additional-info/additionalInfo.dto';

export class CriminalDto {
  @IsOptional()
  first_name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  middle_name?: string;

  @IsOptional()
  additional: AdditionalInfoDto[];
}