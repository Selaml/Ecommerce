

import { ApiProperty } from "@nestjs/swagger";
import { isString } from "antd/es/button";
import { IsDecimal, IsNumber, IsString, isNumber } from "class-validator";
import { Double } from "typeorm";
import { isFloat32Array } from "util/types";




export class CreatePaymenttDto {
    @ApiProperty()
    @IsString()
    orderId: string;

    @ApiProperty()
    @IsString()
    userId: string;
    @ApiProperty()
    @IsNumber()
    totalAmount: number;

    @ApiProperty()
    @IsString()
    address: string;






}