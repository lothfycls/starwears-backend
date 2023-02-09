import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;


}





