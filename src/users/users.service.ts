import { Injectable } from '@nestjs/common';
import { Bid } from 'src/bid/entities/bid.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto, UpdatePasswordDto, UpdateProfileDto, UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
  async findAllPurchases(idClient:number){
    const orders=await this.prisma.order.findMany({
      where:{
        ownerId:idClient,
      },
      include:{
        product:{
          include:{
            productImages:true,
          }
        },
        owner:true,
        _count:true,
        orderItems:true,
      }
    })
    return orders;
  }
  async findProductState(idProduct:number,idClient:number){
    const highestBid= await this.prisma.bid.findFirst({
      where:{
        productId:idProduct,
      },
      orderBy:{
        bidAmount:"desc",
      
      },
      take:1
    })

    const clientBid=await this.prisma.bid.findFirst({
      where:{
        productId:idProduct,
        clientId:idClient,
      },
      orderBy:{
        bidAmount:"desc",
        
      },
      take:1,
    })
    const product= await this.prisma.product.findUnique({
      where:{
        id:idProduct,
      },
      select:{
        state:true,
        auctionEnd:true,
      }
    })
    let state:string;
    let bid=highestBid;
    if(product)
    if(product.state=="Active"){
      if(!clientBid){
        state="never"
      }else if(clientBid.clientId==highestBid.clientId){
        state="already"
      }else{
        state="outbided"
        ;
      }
    }else if(product.state=="OUT"){
      if(clientBid.clientId==highestBid.clientId){
        state="won"
      }else{
        state="closed"
      }
    }else if(product.state=="COMMING"){
      state="closed"
    }else if(product.state=="Sold"){
      state="closed"
    }else{
      state="closed"
    }


    
    

    

    

    



    



    return {
      "state":state,
      "bid":bid,
    }
  }

  async findAllProductBids(idClient:number){
    const afterFiveDays= new Date();
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{bids:{
          some:{
          clientId:idClient,
          },
        }},{
          OR:[
            {
              state:"Active",
            },
            {
              state:"OUT",
            },
            {
              state:"Sold",
              auctionEnd:{
                lt:afterFiveDays,
              }
            }
          ]
        }]
        
      },
      include:{
        bids:{
          orderBy:{
            bidAmount:"desc"
          },
          take:1,
        },
        LastBidder:true,
        productImages:true,
        owner:true,
      }

    })

    return products;

  }

  async findAllProductBidsActive(idClient:number){

    
    const afterFiveDays= new Date();
    await this.prisma.product.updateMany({
      where:{
        auctionEnd:{
          lt:afterFiveDays,
        }
      },
      data:{
        state:"OUT",
      }
    })
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{bids:{
          some:{
          clientId:idClient,
          },
        }},{
          OR:[
            {
              state:"Active",
            }
          ]
        }]
        
      },
      include:{
        bids:{
          orderBy:{
            bidAmount:"desc"
          },
          take:1,
        },
        LastBidder:true,
        productImages:true,
        owner:true,
      }

    })

    return products;

  }

  async findAllProductBidsWins(idClient:number){
    const afterFiveDays= new Date();
    await this.prisma.product.updateMany({
      where:{
        auctionEnd:{
          lt:afterFiveDays,
        }
      },
      data:{
        state:"OUT",
      }
    })
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{bids:{
          some:{
          clientId:idClient,
          state:"WINNED"
          },
        }},{
          OR:[
            {
              state:"OUT",
            },
            {
              state:"Sold",
              
            }
          ]
        }]
        
      },
      include:{
        bids:{
          orderBy:{
            bidAmount:"desc"
          },
          take:1,
        },
        LastBidder:true,
        productImages:true,
        owner:true,
      }

    })

    return products;

  }

  async findAllProductBidsFailed(idClient:number){
    const afterFiveDays= new Date();
    await this.prisma.product.updateMany({
      where:{
        auctionEnd:{
          lt:afterFiveDays,
        }
      },
      data:{
        state:"OUT",
      }
    })
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{bids:{
          every:{
          clientId:idClient,
          state:"ACTIVE",
          },
        }},{
          OR:[
            {
              state:"OUT",
            },
            {
              state:"Sold",
              auctionEnd:{
                lt:afterFiveDays,
              }
            }
          ]
        }]
        
      },
      include:{
        bids:{
          orderBy:{
            bidAmount:"desc"
          },
          take:1,
        },
        LastBidder:true,
        productImages:true,
        owner:true,
      }

    })

    return products;

  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateProfileDto) {
    
    return `This action updates a #${id} user`;
  }
  updatePassword(id:number, updatePassword:UpdatePasswordDto){

  }
  updateEmail(id:number,updateEmail:UpdateEmailDto){

  }

  updatePasswordUsingEmailSent(id:number, email:string){

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
