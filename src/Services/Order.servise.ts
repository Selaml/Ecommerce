import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { async } from "rxjs";
import { CreateOrderDto } from "src/Dto/order/create-order-dto";
import { updateOrderDto } from "src/Dto/order/update-orderDto";
import { OrderEntity } from "src/Entities/order.entity";
import { ProductOrderEntity } from "src/Entities/productorders.entity";
import { IOrderServiceInterface } from "src/Interfaces/orderSericeInterface";
import { Any, Repository } from "typeorm";

@Injectable()
export class OrderServise implements IOrderServiceInterface {
    constructor(@InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
        @InjectRepository(ProductOrderEntity) private productOrderRepo: Repository<ProductOrderEntity>) { }
    async createOrder(createDto: CreateOrderDto): Promise<any> {
        try {
            const order = this.orderRepo.create({
                totalAmount: createDto.totalAmount,
                IsPaid: false


            })
            const savedOrder = await this.orderRepo.save(order)

            createDto.products.forEach(async (element) => {
                const productOrder = await this.productOrderRepo.create({
                    orderId: savedOrder.id,
                    productId: element.productId,
                    quantity: element.quantity

                });
                await this.productOrderRepo.save(productOrder)


            })
            return {
                product: order
            }
        }


        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


    async getAllOrders(): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async updateOrder(id: string, updateDto: updateOrderDto): Promise<any> {

        try {


            const updatedOrder = await this.orderRepo.update(id, {

                totalAmount: updateDto.totalAmount
            })

            const updatedQuantity = []
            const productOrder = await this.productOrderRepo.find({ where: { orderId: id } })
            for (const item of updateDto.products) {
                const productOrderTobeUpdated = this.productOrderRepo.find({ where: { productId: item.productId } })
                if (productOrderTobeUpdated) {
                    (await productOrderTobeUpdated).forEach((element) => {
                        element.quantity = item.quantity
                        updatedQuantity.push(element)



                    })

                }
                else {
                    return new HttpException("product dosent exist", HttpStatus.BAD_REQUEST)

                }


            }


            await this.productOrderRepo.save(updatedQuantity)
            const productQuantity = await this.productOrderRepo.find({ where: { orderId: id }, relations: ['order', 'product'] })

            return {
                msg: "susccess",
                data: productQuantity

            }

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)

        }
    }

    async getOrderById(id: string): Promise<any> {
        try {
            const order = await this.orderRepo.find({ where: { id: id }, relations: ['products'] })
            return order

        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}