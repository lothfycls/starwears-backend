import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import Stripe from 'stripe';
import { PaymentRequestBody } from './entities/payment.entity';

@Injectable()
export class PaymentService {


  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async  retrievePaymentIntent(clientSecret:string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(clientSecret);
    return paymentIntent;
  }

  createPayment(paymentRequestBody: PaymentRequestBody): Promise<any> {
    let sumAmount = 0;
    
    sumAmount = sumAmount + paymentRequestBody.amount;
    
    return this.stripe.paymentIntents.create({
      amount: sumAmount,
      currency: paymentRequestBody.currency,
    });
  }
  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
