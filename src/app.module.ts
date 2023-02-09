import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BidModule } from './bid/bid.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CelebrityModule } from './celebrity/celebrity.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { PaymentModule } from './payment/payment.module';
import { BrandModule } from './brand/brand.module';
import { PlanModule } from './plan/plan.module';
import { BannerModule } from './banner/banner.module';
import { SearchModule } from './search/search.module';
import { PrismaModule } from './prisma/prisma.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule,PrismaModule, CategoryModule, BidModule, ProductModule, OrderModule, CelebrityModule, UsersModule, PaymentModule, BrandModule, PlanModule, BannerModule, SearchModule, FilesModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard,
  },],
  
})
export class AppModule {}
