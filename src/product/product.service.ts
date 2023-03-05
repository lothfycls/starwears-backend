import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Certificate } from 'crypto';
import { identity } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, updateProductState } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {

    const verify=await Promise.all([
      await this.prisma.brand.findUnique({
        where:{
          id:createProductDto.brandId,
        },
        select:{
          id:true,

        }
      }),
      await this.prisma.celebrity.findUnique({
        where:{
          id:createProductDto.celebrityId,
        },
        select:{
          id:true,
        }
      }),
      await this.prisma.category.findUnique({
        where:{
          id:createProductDto.categoryId,
        },
        select:{
          id:true,
        }
      })

        
    ]) 
    console.log(verify)

    if(!verify[0]){
      throw new ForbiddenException("this brand id dosn't exist")
    }
    if(!verify[1]){
      throw new ForbiddenException("this celebrity id dosn't exist")
    }
    if(!verify[2]){
      throw new ForbiddenException("this category id dosn't exist")
    }
    

    let productImages=[];
    createProductDto.productImage.forEach((image)=>{
      productImages.push({url:image})
    })
    const newProduct= await this.prisma.product.create({
      data:{
        name:createProductDto.name,
        brandId:createProductDto.brandId,
        Interior_Color:createProductDto.Interior_Color,
        categoryId:createProductDto.categoryId,
        closure:createProductDto.closure,
        Interior_Material:createProductDto.Interior_Material,
        Material:createProductDto.Material,
        Size:createProductDto.Size,
        department:createProductDto.department,
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
    const products= await this.prisma.product.findMany({
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
          include:{
            _count:true,
          }
        }
        
      }
    })
    return products;
  }

  async findAllActive() {
    const products= await this.prisma.product.findMany({
      where:{
        state:'Active'  
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
          include:{
            _count:true,
          }
        }
        
      }
    })
    return products;
  }

  async findAllEnded(){
    const products= await this.prisma.product.findMany({
      where:{
        state:'Sold'  
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
          include:{
            _count:true,
          }
        }
        
      }
    })
    return products;
  }

  async findAllProductByCategoryId(idCategory:number){
    const products= await this.prisma.product.findMany({
      where:{
        categoryId:idCategory,
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
          include:{
            _count:true,
          }
        }
        
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
          include:{
            _count:true,
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
          include:{
            _count:true,
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
          OR:[
            {
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
            {
              AND:[
                {
                  state:'Active'
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
          include:{
            _count:true,
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
          include:{
            _count:true,
          }
        }
        
      }
    })

    return products;
  }

  async findOne(id: number) {
    const product= await this.prisma.product.findUnique({
      where:{id:id},
      include:{
        productImages:true,
        bids:{
          orderBy:{
            bidAmount:"desc",
          },
          take:1,
        },
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
        LastBidder:true,
      }
    })
    if(!product) throw new ForbiddenException("no product exist with this id");
    const dateNow= new Date();
    if(product.auctionEnd<dateNow && product.state=="Active" && product.bids.length){
      console.log(product.bids)
      const productUpdated=await this.prisma.product.update({
        where:{
          id:id,
        },
        data:{
          state:'OUT',
          bids:{
            update:{
              where:{
                id:product.bids[0].id,
              },
              data:{
                state:"WINNED",
              }
            }
          }
        },
        include:{
          bids:{
            orderBy:{
              bidAmount:"desc",
            },
            take:1
          },
  
        }
      })
      
    }
    return product;
  }
  
  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdated= await this.prisma.product.update({
      where:{
        id:id,
      },
      data:updateProductDto,
    })
    return productUpdated;
  }

  updateStateProduct(id:number, state:string){
    
  }

  async updateStateOfProduct(id:number, updateProductstateDtoe:updateProductState){
    const updateState= await this.prisma.product.update({
      where:{
        id:id,
      },
      data:{
        state:updateProductstateDtoe.state
      }
    })

    return updateState;
  }

  remove(id: number) {
    
    return `This action removes a #${id} product`;
  }
}
