import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class RessetPasswordeDto {



    @ApiProperty()
    @IsEmail()

    email: string;




}