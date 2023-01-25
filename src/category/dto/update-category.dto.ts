import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto  {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    image_url:string;

    
    @IsString()
    @IsNotEmpty()
    description:string;


    @IsOptional()
    @IsNumber()
    parent_id:number;
}
