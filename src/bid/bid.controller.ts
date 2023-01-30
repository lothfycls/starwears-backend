import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Public } from 'src/common/decorators';

@Public()
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post('create')
  create(@Body() createBidDto: CreateBidDto) {
    return this.bidService.create(createBidDto);
  }

  @Get('product/findall/:id')
  findAllBidOfProduct(@Param('id') id: string) {
    return this.bidService.findAllOfProduct(+id);
  }

  @Get('client/findall/:id')
  findAllBidOfUser(@Param('id') id: string) {
    return this.bidService.findAllOfUser(+id);
  }

  @Get('high/:productId')
  findHighbidOnProduc(@Param('productId') id: string){
    return this.bidService.findHighBidOnProduct(+id);
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.bidService.findOne(+id);
  }


  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return this.bidService.update(+id, updateBidDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.bidService.remove(+id);
  }
}
