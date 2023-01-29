import { PaymentWay } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    productId:number;

    @IsString()
    @IsNotEmpty()
    receiver_name:string;

    @IsString()
    @IsNotEmpty()
    receiver_phone:string;


    @IsString()
    @IsNotEmpty()
    shipping_address:string;


    @IsString()
    @IsNotEmpty()
    client_comment:string;


    @IsString()
    @IsNotEmpty()
    payment_way:PaymentWay;


    @IsString()
    @IsNotEmpty()
    shipping_cost:String;


    @IsString()
    @IsNotEmpty()
    total:String;

}
