import { PaymentWay } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsNumber()
    @IsNotEmpty()
    productId:number;

    @IsNumber()
    @IsNotEmpty()
    client_id:number;

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
