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
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


@Module({
  imports:
    [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
        useFactory: typeOrmConfig
      }),
      MailerModule.forRoot({
        transport: {


          host: String(process.env.MAIL_HOST),
          port: Number(process.env.MAIL_PORT),
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          secure: false, // Set to true for secure connections (TLS/SSL)
          ignoreTLS: false, // This is not needed, as secure: false implies no TLS
          // The tls option to control TLS behavior
          tls: {
            rejectUnauthorized: true, // Set to true to reject unauthorized certificates (for secure connections)
            // Other TLS options can be added here as needed
          },
        },
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

