import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory= await this.prisma.category.create({
      data:{
        name:createCategoryDto.name,
        description:createCategoryDto.description,
        image_url:createCategoryDto.image_url,
        parent_id:createCategoryDto.parent_id,
      }
    })

    return newCategory;
  }

  async findAll() {
    const allCategories= await this.prisma.category.findMany({
      
    })
    return allCategories;
  }

  async findAllMainCategories(){
    const categories= await this.prisma.category.findMany({
      where:{
        NOT:{
          parent_category:null,
        }
      }
    })
  }

  async findAllProductByCategory(id:number){
    const allProduct= await this.prisma.product.findMany({
      where:{
        categoryId:id,
      },
      include:{
        productImages:true,
      }
    })
    return allProduct;
  }

  async findAllSubCategoriesByCategory(id:number){
    const allCategories= await this.prisma.category.findMany({
      where:{
        parent_id:id,
      }
    })

    return allCategories;
  }



  

  async findOne(id: number) {
    const OneCategory= await this.prisma.category.findUnique({
      where:{
        id:id,
      }
    })
    if(!OneCategory) throw new ForbiddenException('this Category not exist');
    return OneCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExist = await this.prisma.category.findFirst({
      where: {id:id}
    })
    if (!categoryExist) throw new ForbiddenException('category not exist');
    if(updateCategoryDto.parent_id){
      const category=await this.prisma.category.findFirst({
        where:{
          id:updateCategoryDto.parent_id,
        }
      })
      if(!category) throw new ForbiddenException('there is no Category with the id: that you mention')
    }
    
    const categoryUpdated= await this.prisma.category.update({
      where:{
        id:id,
      },
      data:{
        image_url:updateCategoryDto.image_url,
        name:updateCategoryDto.name,
        description:updateCategoryDto.description,
        parent_id:updateCategoryDto.parent_id,
      }

    })
    
    return categoryUpdated;
  }

  async remove(id: number) {
    const categoryExist = await this.prisma.category.findFirst({
      where: {id:id}
    })
    if (!categoryExist) throw new ForbiddenException('category not exist');
    const deletedCategory= await this.prisma.category.delete({
      where:{
        id:id,
      }
    })
    return deletedCategory;
  }
}
