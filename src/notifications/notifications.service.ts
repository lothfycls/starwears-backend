import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService){
  }
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notifications`;
  }

  async findOne(id: number) {
    const notification= await this.prisma.notifications.findMany({
      where:{
        userId:id,
      }
    })
    return [{
      id:1,
      message:"notifications test",
      userId:42,
      createdAt:Date(),
    },{
      id:1,
      message:"notifications test 2",
      userId:42,
      createdAt:Date(),
    }];
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
