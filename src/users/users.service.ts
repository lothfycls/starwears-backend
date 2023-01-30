import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
