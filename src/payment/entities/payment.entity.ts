import { Product } from "@prisma/client";

export class Payment {}
export class PaymentRequestBody {
  currency: string;
  amount:number;
  
}