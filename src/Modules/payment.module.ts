import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentController } from "src/Controllers/payment.controller";
import { OrderEntity } from "src/Entities/order.entity";
import { paymentEntity } from "src/Entities/payment.entity";
import { PaymentService } from "src/Services/payment.service";



@Module({
    imports: [TypeOrmModule.forFeature([paymentEntity, OrderEntity])],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule { }
