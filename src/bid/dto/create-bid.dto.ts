import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBidDto {

    @IsNotEmpty()
    @IsNumber()
    product_id:number;


    @IsNotEmpty()
    @IsNumber()
    clien_id:number; //a regler

    @IsNotEmpty()
    @IsNumber()
    amount:number;
}
