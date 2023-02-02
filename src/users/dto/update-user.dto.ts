import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}


export class UpdateProfileDto
{
    fist_name:string;

    last_name:string;


    phone_number:string;

    address:string;

}

export class UpdateEmailDto {
    new_email:string;
}

export class UpdatePasswordDto{
    new_password:string;

    old_password:string;
}
