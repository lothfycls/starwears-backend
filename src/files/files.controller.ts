import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Public } from 'src/common/decorators';

import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of, retry } from 'rxjs';
import { createWriteStream, unlink } from 'fs';
import * as cloudinary from 'cloudinary';


@Public()
@Controller('files')
export class FilesController {
  private cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
  constructor(private readonly filesService: FilesService) {
    cloudinary.v2.config(this.cloudinaryConfig);
  }
  

  


  @Post("upload")
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file) {
    const fileName = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    // console.log(file)
    // const response = await cloudinary.v2.uploader.upload(file.buffer, {
    //   public_id: fileName,
    // });
    let resultType=0;
    const imageBuffer = file.buffer;
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
        }
      }).end(imageBuffer);
    });

   

    

    

    
    

  }
  
  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
