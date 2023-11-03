import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "src/Controllers/order.controller";
import { PermissionController } from "src/Controllers/permission.controller";
import { OrderEntity } from "src/Entities/order.entity";
import { permissionsEntity } from "src/Entities/permission.entity";
import { ProductOrderEntity } from "src/Entities/productorders.entity";
import { rolesEntity } from "src/Entities/role.entity";
import { OrderServise } from "src/Services/Order.servise";
import { PermissionService } from "src/Services/permission.service";


@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, ProductOrderEntity])],
    controllers: [OrderController],
    providers: [OrderServise],
})
export class OrderModule { }
