import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';


@Public()
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post("create")
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get("findall")
  findAll() {
    return this.brandService.findAll();
  }

  @Get("findone/:id")
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(+id);
  }

  @Get('findbyid/products/:id')
  findProductByBrand(@Param('id') id: string) {
    return this.brandService.findAllProductbyBrand(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
}
