import { Closure, Department, ProductState } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name:string;


    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    @IsIn(["Active","COMMING"])
    state:ProductState;



    categoryId:number;

    ownerId:number; //delete it already exist celebrityId


    @IsString()
    @IsNotEmpty()
    auctionBegin:string;

    @IsString()
    @IsNotEmpty()
    auctionEnd:string;



    @IsString()
    @IsNotEmpty()
    condition:string;

    @IsString({each:true})
    @IsNotEmpty()
    productImage:string[];


    @IsNumber()
    @IsNotEmpty()
    celebrityId:number;

    @IsNumber()
    @IsNotEmpty()
    lastPrice:number;


    @IsString()
    @IsNotEmpty()
    Color:string;


    @IsString()
    @IsNotEmpty()
    Material:string;


    @IsString()
    @IsNotEmpty()
    Interior_Material:string;

    @IsString()
    @IsNotEmpty()
    closure:Closure;

    @IsNumber()
    @IsNotEmpty()
    brandId:number;

    @IsString()
    @IsNotEmpty()
    Size:string;


    @IsString()
    @IsNotEmpty()
    department:Department;


    @IsString()
    @IsNotEmpty()
    Interior_Color:string;


}
