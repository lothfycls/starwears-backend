import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';

@Injectable()
export class CelebrityService {
  constructor(private prisma: PrismaService) {}
  async create(createCelebrityDto: CreateCelebrityDto) {
    let url_Pictures=[];
    createCelebrityDto.urlPictures.forEach(
      (url)=>{
        url_Pictures.push({url:url})

      }
    )
    const newCelebrity= await this.prisma.celebrity.create({
      data:{
        name:createCelebrityDto.name,
        description:createCelebrityDto.description,
        urlPictures:{
          createMany:{
            data:url_Pictures,
          }
        },
        profession:createCelebrityDto.profession,
      }
    })
    return newCelebrity;
  }

  async findAll() {
    const allCelebrity= await this.prisma.celebrity.findMany({
      include:{
        urlPictures:true,
      }
    })
    return allCelebrity;
  }

  async findAllProductsByCelebrityId(id:number){
    const allProducts= await this.prisma.product.findMany({
      where:{
        ownerId:id,
      },
      include:{
        productImages:true,
      }
    })
    return allProducts;
  }
 

  async findOne(id: number) {
    const celebrity= await this.prisma.celebrity.findUnique({
      where:{
        id:id,
      },
      include:{
        urlPictures:true,
      }
    })
    return celebrity;
  }

  async update(id: number, updateCelebrityDto: CreateCelebrityDto) {
    const unique= await this.prisma.celebrity.findUnique({
      where:{
        id:id,
      }
    });
    if(!unique) throw new ForbiddenException('this celebrity not exist');
    let url_Pictures=[];
    updateCelebrityDto.urlPictures.forEach(
      (url)=>{
        url_Pictures.push({url:url})

      }
    )
    const celebrityUpdated= await this.prisma.celebrity.update({
      where:{
        id:id,
      },
      data:{
        description:updateCelebrityDto.description,
        name:updateCelebrityDto.name,
        urlPictures:{
          createMany:{
            data:url_Pictures,
          }
        },
        profession:updateCelebrityDto.profession,
      }
    })
    
    return celebrityUpdated;
  }

  async remove(id: number) {
    const unique= await this.prisma.celebrity.findUnique({
      where:{
        id:id,
      }
    });
    if(!unique) throw new ForbiddenException('this celebrity not exist');

    const deletedCelebrity= await this.prisma.celebrity.findUnique({
      where:{
        id:id,
      }
    })
    return deletedCelebrity;
  }
}
