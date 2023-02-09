import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { cloudinaryConfig } from './cloudinary.config';

import * as cloudinary from 'cloudinary';

@Injectable()
export class FilesService {
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }
  
  async uploadImage(imagePath: string) {
    
    // return new Promise((resolve, reject) => {
    //   cloudinary.config()
    //   cloudinary.v2.uploader.upload(
    //     imagePath,
    //     { resource_type: 'image' },
    //     (error, result) => {
    //       if (error) {
    //         reject(error);
    //       }
    //       console.log(result)
    //       resolve(result.secure_url);
    //     },
    //   );
    // });
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
