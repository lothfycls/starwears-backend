import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bid } from 'src/bid/entities/bid.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailDto, updatePasswordDashDto, UpdatePasswordDto, UpdateProfileDto, UpdateUserDto, UpdateUserNameDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
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
        _count:true,
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
        AND:[{auctionEnd:{
          lt:afterFiveDays,
        }},{
          state:'Active'
        }]
        
      },
      data:{
        state:"OUT",
      }
    })
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{
          lastBidId:idClient,
          state:"OUT",
        },{
          OR:[
            {
              state:"OUT",
            }
          ]
        }]
        
      },
      include:{
        _count:true,
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
        },
        state:"Active",
      },
      data:{
        state:"OUT",
      }
    })
    afterFiveDays.setHours(afterFiveDays.getDay() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        AND:[{LastBidder:{
          NOT:{
            id:idClient,
          },
        }},{
          bids:{
            some:{
              clientId:idClient,
            }
          }
        },{
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
        _count:true,
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

 async update(id: number, updateUserDto: UpdateProfileDto) {
  const checkUser=await this.prisma.client.findUnique({
    where:{
      id:id,
    }
  })
  if(!checkUser) throw new ForbiddenException("this user id not exist ")
    const profileUpdate= await this.prisma.client.update({
      where:{
        id:id,
      },
      data:{
        address:updateUserDto.address,
        first_name:updateUserDto.first_name,
        last_name:updateUserDto.last_name,
        phone_number:updateUserDto.phone_number
      }
    })
    return profileUpdate;
  }
  async updatePasswordDash(id:number, updatePassword:updatePasswordDashDto){
    const client=await this.prisma.client.findUnique({
      where:{
        id:id,
      }
    })
    
    if(!client) throw new ForbiddenException("this user id not exist ")
    
    const hash = await this.hashData(updatePassword.new_password);
    const clientUpdated= await this.prisma.client.update({
      where:{
        id:id,
      },data:
      {
        password:hash,
      }
    })
    return clientUpdated;
  }

  async updatePassword(id:number, updatePassword:UpdatePasswordDto){
    const client=await this.prisma.client.findUnique({
      where:{
        id:id,
      }
    })
    if(!client) throw new ForbiddenException("this user id not exist ")
    const passwordMatches = await bcrypt.compare(
      updatePassword.old_password,
      client.password,
    );

    if (!passwordMatches) throw new ForbiddenException("password dosn't match");
    const hash = await this.hashData(updatePassword.new_password);
    const clientUpdated= await this.prisma.client.update({
      where:{
        id:id,
      },data:
      {
        password:hash,
      }
    })
    return clientUpdated;
  }
  async updateEmail(id:number,updateEmail:UpdateEmailDto){

    const checkEmails=await this.prisma.client.findFirst({
      where:{
        email:updateEmail.new_email,
      }
    })
    if(checkEmails) throw new ForbiddenException("this email already taken")
    const checkUser=await this.prisma.client.findUnique({
      where:{
        id:id,
      }
    })
    if(!checkUser) throw new ForbiddenException("this user id not exist ")

    const updatedEmail=await this.prisma.client.update({
      where:{
        id:id,
      },
      data:{
        email:updateEmail.new_email,
      }
    })

    return updatedEmail;
  }

  async updateUserName(id:number,updateEmail:UpdateUserNameDto){
    const checkEmails=await this.prisma.client.findFirst({
      where:{
        username:updateEmail.username,
      }
    })
    if(checkEmails) throw new ForbiddenException("this username already taken")
    
    const checkUser=await this.prisma.client.findUnique({
      where:{
        id:id,
      }
    })
    if(!checkUser) throw new ForbiddenException("this user id not exist ")
    const updatedEmail=await this.prisma.client.update({
      where:{
        id:id,
      },
      data:{
        username:updateEmail.username,
      }
    })

    return updatedEmail;
  }

  

  updatePasswordUsingEmailSent(id:number, email:string){

  }

  async remove(id: number) {
    const checkUser=await this.prisma.client.findUnique({
      where:{
        id:id,
      }
    })
    if(checkUser) throw new ForbiddenException("this user id not exist ")
    const userDeleted=await this.prisma.client.delete({
      where:{
        id:id,
      }
    })
    return userDeleted;
  }
}
