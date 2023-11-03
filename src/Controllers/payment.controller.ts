import { Body, Controller, Param, Patch, Post, SetMetadata, UseGuards } from "@nestjs/common";

import { CreatePaymenttDto } from "src/Dto/payment/create-payment-dto";
import { UpdatePaymenttDto } from "src/Dto/payment/update-payment-dto";
import { AuthorizationGuard } from "src/Gurad/AuthorizationGuard";
import { PaymentService } from "src/Services/payment.service";



@Controller('payment')

export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', 'create-payment')

    async createPayment(@Body() createDto: CreatePaymenttDto): Promise<any> {
        return await this.paymentService.createPayment(createDto)

    }
    @Patch(':id')
    @UseGuards(AuthorizationGuard)
    @SetMetadata('permission', 'update-payment')
    async verifyPayment(@Param('id') id: string, @Body() updateDto: UpdatePaymenttDto): Promise<any> {
        return await this.paymentService.VerifyPayments(id, updateDto)

    }

}