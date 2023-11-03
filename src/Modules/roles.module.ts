import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesController } from "src/Controllers/roles.controller";
import { rolesEntity } from "src/Entities/role.entity";
import { RoleService } from "src/Services/roles.service";


@Module({
    imports: [TypeOrmModule.forFeature([rolesEntity])],
    controllers: [RolesController],
    providers: [RoleService],
})
export class RolesModule { }
