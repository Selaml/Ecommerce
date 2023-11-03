import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRolePermissionDto } from "src/Dto/create-role-permission/crate-role-permission-dto";
import { rolePermissionEntity } from "src/Entities/rolePermissions.entity";
import { RolePermissionServise } from "src/Services/role-permission.service";


@Controller('role-permission')
export class RolePermissionController {
    constructor(private rolepermissionServise: RolePermissionServise) { }
    @Post()
    async createRolePermission(@Body() createRolePermissionDto: CreateRolePermissionDto) {

        return await this.rolepermissionServise.createRolePermission(createRolePermissionDto)

    }

    @Get()
    async getAllRolePermissions() {
        try {
            return await this.rolepermissionServise.getRolePermission()
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }

    }
}