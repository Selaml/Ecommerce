

import { ApiProperty } from "@nestjs/swagger";
import { isString } from "antd/es/button";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";
import { Double } from "typeorm";
import { isFloat32Array } from "util/types";




export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    productName: string;


    @ApiProperty()
    @IsOptional()
    price: number;


    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    categoryId: string;


    @ApiProperty()
    @IsOptional()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsOptional()
    ratting: number;


}