import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRolePermissionDto } from "src/Dto/create-role-permission/crate-role-permission-dto";
import { CreateOrderDto } from "src/Dto/order/create-order-dto";
import { updateOrderDto } from "src/Dto/order/update-orderDto";
import { rolePermissionEntity } from "src/Entities/rolePermissions.entity";
import { OrderServise } from "src/Services/Order.servise";
import { RolePermissionServise } from "src/Services/role-permission.service";



@Controller('order')

export class OrderController {
    constructor(private orderServise: OrderServise) { }
    @Post()
    async createorder(@Body() createDto: CreateOrderDto): Promise<any> {

        return await this.orderServise.createOrder(createDto)

    }

    @Get(':id')
    async getordeByOrdeId(@Param('id') id: string): Promise<any> {
        return await this.orderServise.getOrderById(id);

    }

    @Patch(':id')
    async UpdateOrder(@Param('id') id: string, @Body() updatedOrder: updateOrderDto): Promise<any> {

        return await this.orderServise.updateOrder(id, updatedOrder)
    }







}