import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResInterceptor } from './interceptors/res.interceptor';
import { ParamsMiddleware } from './middleware/params/params.middleware';
import { StartParamsModule } from './middleware/params/params.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InitializeModule } from './controllers/initialize/initialize.module';
import { ProfileModule } from './controllers/profile/profile.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      extra: {
        connectionLimit: +process.env.DB_CONNECTION_LIMIT,
      },
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      charset: 'utf8mb4_general_ci',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/*.entity.{js,ts}'],
      synchronize: true,
      cache: false,
    }),
    StartParamsModule,
    InitializeModule,
    ProfileModule,
    TasksModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParamsMiddleware)
      .exclude(
        'static/(.*)?',
        'external(/.*)?',
        'service/(.*)?',
        'external/(.*)?',
      )
      .forRoutes('*');
  }
}
