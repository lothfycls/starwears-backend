import { PaymentWay } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class CreateOrderDto {
    productId:number;

    receiver_name:string;

    receiver_phone:string;

    shipping_address:string;

    client_comment:string;

    payment_way:PaymentWay;

    shipping_cost:String;

    total:String;

}
