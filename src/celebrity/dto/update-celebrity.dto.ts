import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCelebrityDto } from './create-celebrity.dto';

export class updatePictureCelebrityPicturesDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString({each:true})
    urlPictures: string[];

    @IsNotEmpty()
    @IsString()
    descritpion:string;

    @IsOptional()
    @IsString()
    profession:string;
}

export class updateProfile {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsString({each:true})
    email:string;
}
