import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Public } from 'src/common/decorators';


@Public()
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('create')
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get('findall')
  findAll() {
    return this.bannerService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
