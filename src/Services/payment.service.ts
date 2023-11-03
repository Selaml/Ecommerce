import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from "src/Dto/Product/create-produt-dto";
import { CreatePaymenttDto } from "src/Dto/payment/create-payment-dto";
import { paymentEntity } from "src/Entities/payment.entity";
import { productEntity } from "src/Entities/product.entity";
import { IPaymentServiceInterface } from "src/Interfaces/PaymentServiceInterface";
import { IProductServise } from "src/Interfaces/productservisceInterface";
import { Repository } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { UpdatePaymenttDto } from "src/Dto/payment/update-payment-dto";
import { OrderEntity } from "src/Entities/order.entity";
import { CHAPA_PAY_URL, CHAPA_SECRET_KEY, CHAPA_VERIFY_URL } from "src/const/common";

@Injectable()

export class PaymentService implements IPaymentServiceInterface {

    constructor(
        @InjectRepository(paymentEntity)
        private paymentRepo: Repository<paymentEntity>,
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>) { }

    async createPayment(createDto: CreatePaymenttDto): Promise<any> {
        try {
            const txRef = uuidv4();
            console.log(createDto, "lll")

            const payment = this.paymentRepo.create({
                totalamount: createDto.totalAmount,
                userId: createDto.userId,
                orderId: createDto.orderId,
                address: createDto.address,
                tx_ref: txRef


            })
            // console.log(parseInt(createDto.totalAmount), "lolo")
            await this.paymentRepo.save(payment)

            const chapaRequestData = {
                amount: createDto.totalAmount,
                currency: "ETB",

                phone_number: "0912345678",
                tx_ref: txRef,

            }


            const response = await axios.post(


                `${CHAPA_PAY_URL}`,
                chapaRequestData,
                {
                    headers: {

                        Authorization: "Bearer " + `${process.env.CHAPA_SECRET_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }


            );

            if (response.data["status"] == "success" && response.data['data']['checkout_url'].length > 0) {


                return {
                    mesg: 'payment sucesss',
                    paymentUrl: response.data['data']['checkout_url'],
                    payments: await this.paymentRepo.save(payment),
                };
            } else {

                return new HttpException("something went wrong", HttpStatus.BAD_REQUEST)
            }


        }
        catch (error) {
            return await new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
    getAllPayments(): Promise<any> {
        throw new Error("Method not implemented.");
    }


    async VerifyPayments(id: string, updateDto: UpdatePaymenttDto): Promise<any> {
        try {

            const order = await this.paymentRepo.findOne({ where: { orderId: id } })


            const referenceNumber = order.tx_ref

            const response = await axios.get(
                `${process.env.CHAPA_VERIFY_URL}/${referenceNumber}`,

                {
                    headers: {
                        Authorization: "Bearer " + `${process.env.CHAPA_SECRET_KEY}`,
                    },
                }
            );
            if (response.status == 200) {


                const pyamentVerifiy = await this.orderRepo.update(id, { IsPaid: true })

                return {
                    mesg: "payment verified",

                }
            } else {
                return new HttpException("something went wrong", HttpStatus.BAD_REQUEST)
            }


        }
        catch (error) {
            return await new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


}