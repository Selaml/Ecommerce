

import { ApiProperty } from "@nestjs/swagger";
import { isString } from "antd/es/button";
import { IsBoolean, IsDecimal, IsNumber, IsString } from "class-validator";
import { Double } from "typeorm";
import { isBoolean } from "util";
import { isFloat32Array } from "util/types";




export class UpdatePaymenttDto {


    @ApiProperty()
    @IsBoolean()
    IsPaid: boolean;

    @ApiProperty()
    @IsString()
    id: string;


}