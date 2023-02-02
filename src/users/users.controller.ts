import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto, UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators';


@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get("productBids/:id")
  findAllProductBids(@Param('id') id: string){
    return this.usersService.findAllProductBids(+id);
  }

  @Post("purchases/:id")
  findAllProductPurchased(@Param('id') id: string){
    return this.usersService.findAllPurchases(+id);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('profile/update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateProfileDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  

  @Post('password/update/:id')
  updatePassword(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(+id, updateUserDto);
  }

  @Post('password/update/:id')
  updateEmail(@Param('id') id: string, @Body() updateUserDto: UpdateEmailDto) {
    return this.usersService.updateEmail(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
