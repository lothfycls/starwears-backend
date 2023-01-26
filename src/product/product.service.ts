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

  async findAll(){

  }

  async findAllActive() {
    const products= await this.prisma.product.findMany({
      where:{
        state:'Active'  
      }
    })
    return products;
  }

  async findAllEnded(){
    const products= await this.prisma.product.findMany({
      where:{
        state:'Sold'  
      }
    })
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
      },
      include:{
        productImages:true,
        bids:true,
        _count:true,
        brand:{
          select:{
            name:true,
          }
        },
        owner:{
          select:{
            name:true,
          }
        },
        LastBidder:{
          select:{
            id:true,
          }
        }
        
      }
    }) 
    return products;
  }

  async findTrendingProduct(){
    const dateNow= new Date();
    const AfterFiveHours= new Date();
    AfterFiveHours.setHours(AfterFiveHours.getHours() + 5);
    const products= await this.prisma.product.findMany({
      where:{
        OR:[{
          AND:[
            {
              state:'Active'
            },
            {
              auctionBegin:{
                lt: dateNow,
              }
            },
            {
              auctionEnd:{
                gt:dateNow,
              }
            }
          ]
          
         },
         {
          AND:[
            {
              state:'Sold'
            },
            {
              auctionBegin:{
                lt: AfterFiveHours,
              }
            },
            {
              auctionEnd:{
                gt:AfterFiveHours,
              }
            }
          ]
          
         }
        ]
      }
      ,
      include:{
        productImages:true,
        bids:true,
        _count:true,
        brand:{
          select:{
            name:true,
          }
        },
        owner:{
          select:{
            name:true,
          }
        },
        LastBidder:{
          select:{
            id:true,
          }
        }
        
      }
      
    })

    return products;
  }




  async findAllUpcommingProduct(){
    const dateNow= new Date();
    const products= await this.prisma.product.findMany({
      where:{
        
          AND:[
            {
              state:'COMMING'
            },
            {
              auctionBegin:{
                gt: dateNow,
              }
            },
            {
              auctionEnd:{
                gt:dateNow,
              }
            }
          ]
          
         
      },
      include:{
        productImages:true,
        bids:true,
        _count:true,
        brand:{
          select:{
            name:true,
          }
        },
        owner:{
          select:{
            name:true,
          }
        },
        LastBidder:{
          select:{
            id:true,
          }
        }
        
      }
    })

    return products;
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
      },
      include:{
        productImages:true,
        bids:true,
        _count:true,
        brand:{
          select:{
            name:true,
          }
        },
        owner:{
          select:{
            name:true,
          }
        },
        LastBidder:{
          select:{
            id:true,
          }
        }
        
      }
    })

    return products;
  }

  async findOne(id: number) {
    const products= await this.prisma.product.findUnique({
      where:{id:id},
      include:{
        productImages:true,
        bids:true,
        _count:true,
        brand:{
          select:{
            name:true,
          }
        },
        owner:{
          select:{
            name:true,
          }
        },
        LastBidder:{
          select:{
            id:true,
          }
        }
        
      }
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
