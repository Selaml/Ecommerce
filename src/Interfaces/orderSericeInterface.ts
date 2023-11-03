import { CreateOrderDto } from "src/Dto/order/create-order-dto"
import { updateOrderDto } from "src/Dto/order/update-orderDto"


export interface IOrderServiceInterface {
    createOrder(createDto: CreateOrderDto): Promise<any>
    getAllOrders(): Promise<any>
    updateOrder(id: string, updateDto: updateOrderDto): Promise<any>
    getOrderById(id: string): Promise<any>

}