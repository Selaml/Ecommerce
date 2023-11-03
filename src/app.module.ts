import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';



import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Config/db.config';
import { UsersModule } from './Modules/users.module';
import { RolesModule } from './Modules/roles.module';
import { PermissionsModule } from './Modules/permissions.module';
import { Authentication } from './Middleware/authentication';
import { RolePermissionModule } from './Modules/rolepermission.module';
import { ProductCategoryModule } from './Modules/productcategory.module';
import { ProductModule } from './Modules/product.module';
import { OrderModule } from './Modules/order.module';
import { PaymentModule } from './Modules/payment.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:
    [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: typeOrmConfig
      }),

      // TypeOrmModule.forRoot(typeOrmConfig),
      UsersModule,
      RolesModule,
      PermissionsModule,
      RolePermissionModule,
      ProductCategoryModule,
      ProductModule,
      OrderModule,
      PaymentModule,



    ],
  controllers: [],
  providers: [],
})



export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authentication)
      .exclude('users')
      .forRoutes("product")

  }

}

