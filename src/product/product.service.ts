import { Injectable } from '@nestjs/common';
import { Certificate } from 'crypto';
import { identity } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    let productImages=[];
    createProductDto.productImage.forEach((image)=>{
      productImages.push({url:image})
    })
    const newProduct= await this.prisma.product.create({
      data:{
        name:createProductDto.name,
        condition:createProductDto.condition,
        state:createProductDto.state,
        description:createProductDto.description,
        ownerId:createProductDto.celebrityId,
        productImages:{
          createMany:{
            data:productImages,
          },
        },
        auctionEnd:createProductDto.auctionEnd,
        Color:createProductDto.Color,
        auctionBegin:createProductDto.auctionBegin,

      }
    })
    return newProduct;
  }

  async findAll() {
    const products= await this.prisma.product.findMany()
    return products;
  }

  async findAllProductByCategoryId(idCategory:number){
    const products= await this.prisma.product.findMany({
      where:{
        categoryId:idCategory,
      }
    })
    return products;
  }

  async findAllProductByCelebrityId(idCelebrity:number){
    const products= await this.prisma.product.findMany({
      where:{
        ownerId:idCelebrity,
      }
    }) 
    return products;
  }

  async findTrendingProduct(){

  }

  async findAllUpcommingProduct(){
    
  }

  async getStateUserForProduct(userId:number, productId:number){
    const  product= await this.prisma.product.findUnique({
      where:{
        id:productId,
      },
      select:{
        state:true,
      }
    })



    if(product.state=='Active'){
      const highestBidsOfproduct= await this.prisma.bid.findMany({
        where:{
          productId:productId,
        },
        orderBy:{
          bidAmount:'desc'
        },
        take:1
      })
  
      const highestBidOnProductByUser= await this.prisma.bid.findMany({
        where:{
          AND:[{productId:productId},
          {
            clientId:userId,
          }]
        },
        orderBy:{
          bidAmount:'desc'
        },
        take:1
  
      })
    }
    

  




    


    
    
  
  }
  async findAllProductPurchasedByClientId(idClientId:number){
    const products= await this.prisma.product.findMany({
      where:{
        winClientId:idClientId,
      }
    })

    return products;
  }

  async findOne(id: number) {
    const products= await this.prisma.product.findUnique({
      where:{id:id}
    })
    return products;
  }
  
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  updateStateProduct(id:number, state:string){
    
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
