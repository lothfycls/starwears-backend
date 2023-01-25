import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


const states:string[]= ["active","desactive"]
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

  @Get("closed/findall")
  findAllClosed() {
    return this.productService.findAll();
  }

  @Get("opened/findall")
  findAllOpened() {
    return this.productService.findAll();
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
