import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCelebrityDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString({each:true})
    urlPictures: string[];

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsString()
    profession:string;
}

export class CreateCelebrityAccountDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString({each:true})
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;    
    
}

