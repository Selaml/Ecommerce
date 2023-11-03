import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "src/Controllers/permission.controller";
import { ProductCategoryContriller } from "src/Controllers/productcategory.controller";
import { ProductController } from "src/Controllers/products.controller";
import { categoryEntity } from "src/Entities/category.entity";
import { permissionsEntity } from "src/Entities/permission.entity";
import { productEntity } from "src/Entities/product.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { PermissionService } from "src/Services/permission.service";
import { ProductService } from "src/Services/product.servise";
import { ProductCategoryServise } from "src/Services/productcategory.servise";


@Module({
    imports: [TypeOrmModule.forFeature([categoryEntity])],
    controllers: [ProductCategoryContriller],
    providers: [ProductCategoryServise],
})
export class ProductCategoryModule { }
