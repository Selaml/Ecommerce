import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/Controllers/permission.controller";
import { permissionsEntity } from "src/Entities/permission.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { PermissionService } from "src/Services/permission.service";


@Module({
    imports: [TypeOrmModule.forFeature([permissionsEntity])],
    controllers: [PermissionController],
    providers: [PermissionService],
})
export class PermissionsModule { }
