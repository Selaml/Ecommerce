import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePremissionDto {

    @ApiProperty()
    @IsString()
    permissionName: string
    @ApiProperty()
    @IsString()
    slug: string

}