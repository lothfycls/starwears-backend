import { Module } from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { CelebrityController } from './celebrity.controller';

@Module({
  controllers: [CelebrityController],
  providers: [CelebrityService]
})
export class CelebrityModule {}
