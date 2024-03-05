import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger.middleware';

import { User } from './user/user.entity';
import { Contact } from './contact/contact.entity';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';
import { ReportImagesModule } from './report_images/report_images.module';
import { CriminalController } from './criminal/criminal.controller';
import { CriminalModule } from './criminal/criminal.module';
import { AdditionalInfoService } from './additional-info/additional-info.service';
import { AdditionalInfoModule } from './additional-info/additional-info.module';

import { Criminal } from './criminal/criminal.entity';
import { Report } from './report/report.entity';
import { Image } from './report_images/report_images.entity';
import { AdditionalInfo } from './additional-info/additional-info.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          driver: require('mysql2'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [User, Contact, Criminal, Report, Image, AdditionalInfo],
          //logging: true,
          synchronize: configService.get<boolean>('TYPEORM_SYNC', false),
        };
      },
      inject: [ConfigService],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_SECRET_KEY,
        },
      },
      defaults: {
        from: '"nest-modules" <shestakov.vladyslav.work@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    ContactModule,
    UserModule,
    ReportModule,
    ReportImagesModule,
    CriminalModule,
    AdditionalInfoModule,
  ],
  controllers: [AppController, ReportController, CriminalController],
  providers: [AppService, ReportService, AdditionalInfoService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}