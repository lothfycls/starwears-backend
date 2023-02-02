import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';

@Injectable()
export class BidService {
  constructor(private prisma:PrismaService){}
  async create(createBidDto: CreateBidDto) {
    // i need to check product state

    const product= await this.prisma.product.findUnique({
      where:{
        id:createBidDto.product_id,
      },
      select:{
        bids:{
          orderBy:{
            bidAmount:"desc",
            
          },
          take: 1,
        }
      }
    })
    
    if(!product.bids){
      const maxAmount = product.bids[0].bidAmount;
      if(maxAmount>=createBidDto.amount) throw new ForbiddenException("your bid is low than the highest bid on this product")
    }
    
    
    const now=new Date();
    const bid= await this.prisma.bid.create({
      data:{
        productId:createBidDto.product_id,
        bid_date:now,
        bidAmount:createBidDto.amount,
        clientId:createBidDto.clien_id,
      },
      include:{
        client:true,
        product:true,
      }
    })
    return bid;
  }

  async findAllOfProduct(id:number){
    const bids= await this.prisma.bid.findMany({
      where:{
        productId:id,
      },
      include:{
        client:true,
      }
    })
    return bids;
  }

  async  findAllOfUser(id:number){
    const bids= await this.prisma.bid.findMany({
      where:{
        clientId:id,
      }
    })
    return bids;
  }


  async findHighBidOnProduct(id:number){
    const highBid= await this.prisma.bid.findFirst({
      where:{
        productId:id,
      },
      orderBy:{
        bidAmount:'desc',
      },
      take:1
    })


    return highBid;
  }
  findAll() {
    
    return `This action returns all bid`;
  }

  async findOne(id: number) {
    const bid= await this.prisma.bid.findUnique({
      where:{
        id:id,
      },
      include:{
        client:true,
        product:{
          include:{
            productImages:true,
            owner:true
          }
        }
      }
    })
    return bid;
  }

  update(id: number, updateBidDto: UpdateBidDto) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return `This action removes a #${id} bid`;
  }
}
