import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';
import { Public } from 'src/common/decorators';


@Public()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('findall')
  findAll() {
    return this.orderService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('purchases/:userId')
  findAllPurchases(@Param('userId') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post('find/:id')
  updateorderNumber(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }



  @Post('update/state/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderStatusDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
