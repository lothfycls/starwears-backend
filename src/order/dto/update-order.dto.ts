import { PartialType } from '@nestjs/mapped-types';
import { OrderState } from '@prisma/client';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';



export class UpdateOrderStatusDto  {
    @IsString()
    @IsIn(["PAID","DELIVERED","PENDING","CANCELLED"])
    @IsNotEmpty()
    order_status:OrderState;
}


export class UpdateTrackingNumberDto {
    @IsNumber()
    @IsNotEmpty()
    orderNumber:number;
    
    @IsString()
    @IsIn(["PAID","DELIVERED","PENDING","CANCELLED"])
    @IsNotEmpty()
    order_status:OrderState;
}



export class UpdateOrderNumberDto {
    @IsNumber()
    @IsNotEmpty()
    orderNumber:number;
}
