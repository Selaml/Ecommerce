import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDecimal, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProductOrderEntity } from "src/Entities/productorders.entity";
import { isNumber } from "util";



export class updateOrderDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    totalAmount: number
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    IsPaid: boolean;
    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderEntity)
    products: ProductOrderEntity[];


}

