import { Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolePermissionController } from "src/Controllers/role-permission.controller";
import { permissionsEntity } from "src/Entities/permission.entity";
import { rolePermissionEntity } from "src/Entities/rolePermissions.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { RolePermissionServise } from "src/Services/role-permission.service";


@Module({
    imports: [TypeOrmModule.forFeature([rolePermissionEntity])],
    controllers: [RolePermissionController],
    providers: [RolePermissionServise],
    exports: []
})
export class RolePermissionModule { }

