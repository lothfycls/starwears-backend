import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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



  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
