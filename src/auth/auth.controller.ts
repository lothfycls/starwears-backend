import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'src/common/decorators';

import { AuthService } from './auth.service';
import { CreateAuthDto} from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';


@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("client/local/signup")
  @HttpCode(HttpStatus.CREATED)
  create(@Body() authDtoSignUp:CreateAuthDto ) {
    return this.authService.createNewUser(authDtoSignUp);
  }

  @Post("client/local/login")
  login(@Body() authDtoSignUp:CreateAuthDto ) {
    return this.authService.login(authDtoSignUp);
  }

  @Post("user/newadmin")
  createNewUserDash(@Body() authDtoSignUp:CreateAuthDto){
    return this.authService.createNewUserDash(authDtoSignUp)
  }

  @Post("user/login")
  loginDash(@Body() authDtoSignUp:CreateAuthDto){
    return this.authService.loginDash(authDtoSignUp)
  }


  @Post("/sendEmail")
  findAll() {
    return this.authService.verifyEmail();
  }

  @Get("/verifyEmail")
  verifyEmail(){
    
  }

  
}
