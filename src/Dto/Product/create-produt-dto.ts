

import { ApiProperty } from "@nestjs/swagger";
import { isString } from "antd/es/button";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";
import { Double } from "typeorm";
import { isFloat32Array } from "util/types";




export class CreateProductDto {
    @ApiProperty()
    @IsString()
    productName: string;


    @ApiProperty()
    price: number;
    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    categoryId: string;
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsOptional()
    ratting: number;


}