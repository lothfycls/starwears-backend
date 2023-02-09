import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  
  async create(createOrderDto: CreateOrderDto) {
    const newOrder= await this.prisma.order.create({
      data:{
        total:createOrderDto.total,
        orderNumber:createOrderDto.orderNumber,
        receiver_name:createOrderDto.receiver_name,
        client_comment:createOrderDto.client_comment,
        receiver_phone:createOrderDto.receiver_phone,
        shipping_cost:createOrderDto.shipping_cost,
        owner:{
          connect:{
            id:createOrderDto.ownerId,
          }
        },
        payment_way:createOrderDto.payment_way,
        shipping_address:createOrderDto.shipping_address,
        product:{
          connect:{
            id:createOrderDto.productId,
          }
        }
      }
    })
    
    return newOrder;
  }

  async findAll() {
    const allOrders= await this.prisma.order.findMany({
      include:{
        _count:true,
        product:true,
        owner:true,
      }
    })
    return allOrders;
  }

  async findOne(id: number) {
    const orders= await this.prisma.order.findMany({
      where:{
        ownerId:id,
      },
      include:{
        _count:true,
        owner:true,
        product:true,
      }
    })
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderStatusDto) {
    const updatedOrder= await this.prisma.order.update({
      where:{
        id:id,
      },
      data:{
        order_status:updateOrderDto.order_status,
      }
    })
    return updatedOrder;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
