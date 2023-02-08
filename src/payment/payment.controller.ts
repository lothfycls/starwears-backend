import {  HttpStatus,  Res,Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

import { Public } from 'src/common/decorators';

import { PaymentRequestBody } from './entities/payment.entity';
import { Response } from 'express';

@Public()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("createintent")
  createPayments(
    @Res() response: Response,
    @Body() paymentRequestBody: PaymentRequestBody,
  ) {const paymentIntent = this.paymentService
      .createPayment(paymentRequestBody)
      .then((res) => {
        response.status(HttpStatus.CREATED).json(res);
      })
      .catch((err) => {
        response.status(HttpStatus.BAD_REQUEST).json(err);
      });
      return { clientSecret: paymentIntent };
  }
  @Get("get-status")
  async getPaymentIntentStatus(@Body() clientSecret:string) {
    const paymentIntent = await this.paymentService.retrievePaymentIntent(clientSecret);
    return { status: paymentIntent.status };
  }

  @Post('update-order-status')
  async updateOrderStatus(@Body() body) {
    const { orderId, paymentIntentStatus } = body;

    // Update the status of the order based on the payment intent status
    // ...

    return { message: 'Order status updated' };
  }


  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
