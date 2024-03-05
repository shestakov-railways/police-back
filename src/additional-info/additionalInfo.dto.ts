import { IsOptional, IsNotEmpty } from 'class-validator';
export class AdditionalInfoDto {
    @IsNotEmpty()
    type: string;

    @IsOptional()
    value: string;
}