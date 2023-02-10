import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto, updatePasswordDashDto, UpdatePasswordDto, UpdateProfileDto, UpdateUserDto, UpdateUserNameDto } from './dto/update-user.dto';
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
  @Get("bids/failed/:id")
  findAllProductBidsfailed(@Param('id') id: string){
    return this.usersService.findAllProductBidsFailed(+id);
  }

  @Get("bids/wins/:id")
  findAllProductBidsWins(@Param('id') id: string){
    return this.usersService.findAllProductBidsWins(+id);

  }

  @Get("bids/active/:id")
  findAllProductBidActive(@Param('id') id:string){
    return this.usersService.findAllProductBidsActive(+id);
  }

  @Get("state/product/:idProduct/:idClient")
  findRelation(@Param('idProduct') idProduct: string,@Param('idClient') idClient: string){
    return this.usersService.findProductState(+idProduct,+idClient);
  }

  @Get("purchases/:id")
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

  @Post('password/updateDash/:id')
  updatePasswordDash(@Param('id') id: string, @Body() updateUserDto: updatePasswordDashDto) {
    return this.usersService.updatePasswordDash(+id, updateUserDto);
  }

  @Post('email/update/:id')
  updateEmail(@Param('id') id: string, @Body() updateUserDto: UpdateEmailDto) {
    return this.usersService.updateEmail(+id, updateUserDto);
  }

  @Post('username/update/:id')
  updateUserName(@Param('id') id: string, @Body() updateUserDto: UpdateUserNameDto) {
    return this.usersService.updateUserName(+id, updateUserDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
