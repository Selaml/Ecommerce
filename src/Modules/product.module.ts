import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/Controllers/permission.controller";
import { ProductController } from "src/Controllers/products.controller";
import { permissionsEntity } from "src/Entities/permission.entity";
import { productEntity } from "src/Entities/product.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { usersEntity } from "src/Entities/users.entity";
import { PermissionService } from "src/Services/permission.service";
import { ProductService } from "src/Services/product.servise";


@Module({
    imports: [TypeOrmModule.forFeature([productEntity, usersEntity])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }
