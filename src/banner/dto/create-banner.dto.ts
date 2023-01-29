import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBannerDto {
    @IsString()
    @IsNotEmpty()
    image:string


    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsOptional()
    title:string;
}
