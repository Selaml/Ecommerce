import { CreateOrderDto } from "src/Dto/order/create-order-dto"
import { CreatePaymenttDto } from "src/Dto/payment/create-payment-dto"
import { UpdatePaymenttDto } from "src/Dto/payment/update-payment-dto"


export interface IPaymentServiceInterface {
    createPayment(createDto: CreatePaymenttDto): Promise<any>
    getAllPayments(): Promise<any>
    VerifyPayments(orderid: string, updateDto: UpdatePaymenttDto): Promise<any>


}