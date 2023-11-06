import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class VerificationCodeDto {



    @ApiProperty()
    @IsString()

    verification: string;




}