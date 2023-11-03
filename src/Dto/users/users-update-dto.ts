import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class UsersUpdateDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;


    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;


    @ApiProperty()
    @IsString()

    @IsOptional()
    password: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    roleId: string;


}