import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResInterceptor } from "./interceptors/res.interceptor";
import { ParamsMiddleware } from "./middleware/params/params.middleware";
import { StartParamsModule } from "./middleware/params/params.module";
import { ScheduleModule } from "@nestjs/schedule";
import { InitializeModule } from "./controllers/initialize/initialize.module";
import { TasksModule } from "./tasks/tasks.module";
import { UploadsModule } from "./controllers/uploads/uploads.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 20,
			},
		]),
		TypeOrmModule.forRoot({
			type: "mysql",
			extra: {
				connectionLimit: +process.env.DB_CONNECTION_LIMIT,
			},
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			charset: "utf8mb4_general_ci",
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [`${__dirname}/entities/*.entity.{js,ts}`],
			synchronize: process.env.NODE_ENV === "dev",
			cache: false,
		}),
		StartParamsModule,
		InitializeModule,
		TasksModule,
		UploadsModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
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
				{ path: "static/{*path}", method: RequestMethod.GET },
				{ path: "docs{*path}", method: RequestMethod.GET },
			)
			.forRoutes("*");
	}
}
