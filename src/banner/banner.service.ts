import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {

  constructor(private  prisma:PrismaService){
  
  }
  async create(createBannerDto: CreateBannerDto) {
    const banner= await this.prisma.banner.create({
      data:{
        description:createBannerDto.description,
        image:createBannerDto.image,
        title:createBannerDto.title,
      }
    })

    return banner;
  }

  async findAll() {
    const banners= await this.prisma.banner.findMany({
      
    })
    return banners;
  }

  async findOne(id: number) {
    const banner = await this.prisma.banner.findUnique({
      where:{
        id:id,
      }
    })
    return banner;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const banner= await this.prisma.banner.update({
      where:{
        id:id,
      },
      data:updateBannerDto
    })
    return banner;
  }

  async remove(id: number) {
    const bannerExist = await this.prisma.banner.findUnique({
      where:{
        id:id,
      }
    })
    if(!bannerExist) new ForbiddenException('this banner id not exist')
    const banner= await this.prisma.banner.delete({
      where:{
        id:id,
      }
    })
    return banner;
  }
}
