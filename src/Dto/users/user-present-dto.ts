import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class UsersPresentDto {



    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    proPic: string;






}