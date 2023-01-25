import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';


@Controller('celebrity')
export class CelebrityController {
  constructor(private readonly celebrityService: CelebrityService) {}

  @Post("create")
  create(@Body() createCelebrityDto: CreateCelebrityDto) {
    return this.celebrityService.create(createCelebrityDto);
  }

  @Get("findall")
  findAll() {
    return this.celebrityService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.celebrityService.findOne(+id);
  }
  @Get('findproduct/bycelebrity/:id')
  findProductOfCelebrityById(@Param('id') id: string) {
    return this.celebrityService.findAllProductsByCelebrityId(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateCelebrityDto: CreateCelebrityDto) {
    return this.celebrityService.update(+id, updateCelebrityDto);
  }

  @Get('delete/:id')
  remove(@Param('id') id: string) {
    return this.celebrityService.remove(+id);
  }
}
