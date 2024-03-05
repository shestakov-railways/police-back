import { IsNotEmpty, IsOptional } from 'class-validator';
import { CriminalDto } from '../criminal/criminal.dto';

export class CreateReportDto {
    @IsNotEmpty()
    first_name: string;
    
    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    middle_name?: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    accident_type: string;

    @IsNotEmpty()
    text: string;

    @IsOptional()
    images: any[];

    @IsOptional()
    criminals: CriminalDto[];
}