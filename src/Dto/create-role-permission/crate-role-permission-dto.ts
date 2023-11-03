import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class CreateRolePermissionDto {


    @ApiProperty()
    @IsString()
    roleId: string
    @ApiProperty()
    @IsString({ each: true })
    permissionId: string[];
}