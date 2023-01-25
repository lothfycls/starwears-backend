import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';


import { diskStorage } from 'multer';
import  { join } from 'path';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of, retry } from 'rxjs';

import { Public } from 'src/common/decorators';

export const storagePath = (pathFile:string) => {
  const storage=
  {storage: diskStorage({
    destination:pathFile,
    filename:  (req, file, cb) => {
      if (!file) throw new ForbiddenException('no file provided');
    
      const filename :string =  path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4()
      const extension :string= path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`)
    }
  })}
  return storage;
}

@Public()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post("create")
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get("findall")
  findAll() {
    return this.categoryService.findAll();
  }

  @Get("findproduct/bycategory/:id")
  findAllProductOfCategory(@Param('id') id:string){
    return this.categoryService.findAllProductByCategory(+id);
  }

  @Get("findallsub/bycategory/:id")
  findAllSubCategory(@Param('id') id:string){
    return this.categoryService.findAllSubCategoriesByCategory(+id)
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }




  //upload images of a product
  @Post('upload/category-image')
  @UseInterceptors(FileInterceptor('file',storagePath("./uploads/category/images")))
  uploadFile1(@UploadedFile() file) : Observable<Object>{
    return of({imagePath: file.path})
  }

}
