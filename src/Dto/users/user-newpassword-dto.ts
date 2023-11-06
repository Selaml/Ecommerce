import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
} from 'class-validator';

export class NewPasswordDto {



    @ApiProperty()
    @IsString()

    newPassword: string;
    @ApiProperty()
    @IsString()

    ConfirmPasword: string;




}