import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderNumberDto, UpdateOrderStatusDto, UpdateTrackingNumberDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  
  async create(createOrderDto: CreateOrderDto) {
    const orderExist= await this.prisma.order.findFirst({
      where:{
        productId:createOrderDto.productId,
      }
      
    })
    if(orderExist){
      const orderNumber=orderExist.id
      throw new ForbiddenException(`this product is already related to an Order with the Id: ${orderNumber}`)
    } 

    const product= await this.prisma.product.findUnique({
      where:{
        id:createOrderDto.productId,
      }
    })

    if(!product){
      throw new ForbiddenException("no product exist with this id")
    }else{
      if(product.auctionEnd> new Date()) {
        throw new ForbiddenException("this product still avalaible for auctions,or disabled")
      }
      if(product.lastBidId!=createOrderDto.ownerId){
        throw new ForbiddenException("this order can't be placed by you, it is owned by another person")
      }
    }
    
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
      },
      include:{
        product:true,
        owner:true,
      }
    })
    

    


    
    const productdjdj=await this.prisma.product.update({
      where:{
        id:createOrderDto.productId,
      },
      data:{
        state:"Sold",
      }
    })
    await this.prisma.notifications.create({
      data:{
        message:" Hi , we're thrilled to let you know that your purchase of "+ productdjdj.name+" is now complete. Your payment has been processed, and your product will be shipped to you soon. Thank you for using our auction application, and we hope you enjoy your purchase!",
        userId:createOrderDto.ownerId,
      }
    })
    return newOrder;
  }

  async updateTrackinNumber(orderId:number,trackingNumber: UpdateOrderNumberDto){
    const orderUpdate= await this.prisma.order.update({
      where:{
        id:orderId,
      },
      data:{
        orderNumber:trackingNumber.orderNumber.toString()
      }
    })
    return orderUpdate;
  }

  async getOrderDeliveryInfo(numberTrack:string){

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
    try{
      const orders= await this.prisma.order.findUnique({
      where:{
        id:id,
      },
      include:{
        _count:true,
        owner:true,
        product:{
          include:{
            _count:true,
            productImages:true,
            bids:{
              orderBy:{
                bidAmount:"desc"
              },

            },

          }
        },
      }
    })
    return orders;
    }catch(err){
      console.log(err)
      return "this Order Id Dosn't Exist"
    }
    
  }

  async findFailed(id: number) {
    const orders= await this.prisma.order.findMany({
      where:{
        AND:[{
          ownerId:id,
        },{
          order_status:"PENDING"
        }]
        
      },
      include:{
        _count:true,
        owner:true,
        product:{
          include:{
            
            _count:true,
            productImages:true,
            LastBidder:true,
            bids:true,
            owner:true,
            clientWin:true,
          }
        },
      }
    })
    return orders;
  }

  async findSuccess(id: number) {
    const orders= await this.prisma.order.findMany({
      where:{
        AND:[{
          ownerId:id,
        },{
          order_status:"PAID"
        }]
      },
      include:{
        _count:true,
        owner:true,
        product:{
          include:{
            _count:true,
            productImages:true,
            LastBidder:true,
            bids:true,
            owner:true,
            clientWin:true,
          }
        },
      }
    })
    return orders;
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

  async remove(id: number) {

    
    const removeOrder= await this.prisma.order.delete({
      where:{
       id:id,
      }
    })
    return removeOrder;
  }
}
