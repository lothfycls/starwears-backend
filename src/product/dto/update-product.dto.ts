import { PartialType } from '@nestjs/mapped-types';
import { ProductState } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
    @IsString()
    name:string;
    @IsString()
    description:string;

    @IsString()
    @IsIn(["Solde","OUT","COMMING","Desactive","Active"])
    state:ProductState;
    @IsString()
    condition:string;
    
}

export class updateProductState {
    @IsString()
    @IsIn(["Solde","OUT","COMMING","Desactive","Active"])
    state:ProductState;
    
}
