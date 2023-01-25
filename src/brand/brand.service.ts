import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {


  constructor(private prisma:PrismaService){}

  
  async create(createBrandDto: CreateBrandDto) {
    const brand= await this.prisma.brand.create({
      data:createBrandDto,
    })

    return brand;
  }

  async findAll() {
    const allBrands= await this.prisma.brand.findMany({})
    return allBrands;
  }
  async findAllProductbyBrand(id:number){
    const allProduct= await this.prisma.product.findMany({
      where:{
        brandId:id,
        state:'Active',
      },
      include:{
        productImages:true,
      }
    })
  }

  async findOne(id: number) {

    return `This action returns a #${id} brand`;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const exist= await this.prisma.brand.findUnique({
      where:{
        id:id,
      }
    })
    if(!exist) throw new ForbiddenException('brand not exist');

    const brandUpdated= await this.prisma.brand.update({
      where:{
        id:id,
      },
      data:updateBrandDto,
    })
    
    return brandUpdated;
  }

  async remove(id: number) {
    const exist= await this.prisma.brand.findUnique({
      where:{
        id:id,
      }
    })
    if(!exist) throw new ForbiddenException('brand not exist');
    const brand= await this.prisma.brand.delete({
      where:{
        id:id,
      }
    })
    return brand;
  }
}
