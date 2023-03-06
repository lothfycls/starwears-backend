import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class UpdateProfileDto
{
    @IsString()
    @IsOptional()
    first_name:string;


    @IsString()
    @IsNotEmpty()
    last_name:string;

    @IsString()
    @IsOptional()
    phone_number:string;


    @IsString()
    @IsNotEmpty()
    address:string;

}

export class UpdateEmailDto {
    @IsString()
    @IsNotEmpty()
    new_email:string;
}

export class UpdateUserNameDto {
    @IsString()
    @IsNotEmpty()
    username:string;
}

export class UpdatePasswordDto{
    @IsString()
    @IsNotEmpty()
    new_password:string;

    @IsString()
    @IsNotEmpty()
    old_password:string;
}


export class updatePasswordDashDto{
    @IsString()
    @IsNotEmpty()
    new_password:string;
}
