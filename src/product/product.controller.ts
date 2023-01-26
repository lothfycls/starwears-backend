import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from 'src/common/decorators';


const states:string[]= ["active","desactive"]

@Public()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get("findall")
  findAll() {
    return this.productService.findAll();
  }

  @Get('state/product/foruser/:productId/:userId')
  getStateUser(@Param('userId') userId:string,@Param('productId') productId:string){
    return this.productService.getStateUserForProduct(+userId, +productId)
  }


  @Get("trends/findall")
  findAllTrendingProduct(){
    return this.productService.findTrendingProduct();
  }


  @Get("upcoming/findall")
  findAllUpcommingProduct(){
    return this.productService.findAllUpcommingProduct()
  }


  


  @Get("/end/findall")
  findAllClosed() {
    return this.productService.findAllEnded();
  }

  @Get("active/findall")
  findAllOpened() {
    return this.productService.findAllActive();
  }



  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Get('state/update/:id/:state')
  updateStateProduct(@Param('id') id: string,@Param("state") state:string ) {
    if(!states.includes(state)) throw new ForbiddenException('provide a valide state from [active,desactive]');
    return this.productService.updateStateProduct(+id, state);
  }

  @Post('update/:id')
  updateState(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Get(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
