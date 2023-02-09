import { PaymentWay } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDto {

    @IsNumber()
    @IsNotEmpty()
    productId:number;

    @IsNumber()
    @IsNotEmpty()
    ownerId:number;

    @IsOptional()
    @IsString()
    orderNumber:string;

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

    @IsIn(["CARD","PAYPAL"])
    @IsString()
    @IsNotEmpty()
    payment_way:PaymentWay;


    @IsNumber()
    @IsNotEmpty()
    shipping_cost:number;


    @IsNumber()
    @IsNotEmpty()
    total:number;

}

