import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
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
