import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResInterceptor } from "./interceptors/res.interceptor";
import { ParamsMiddleware } from "./middleware/params/params.middleware";
import { StartParamsModule } from "./middleware/params/params.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { InitializeModule } from "./controllers/initialize/initialize.module";
import { ProfileModule } from "./controllers/profile/profile.module";
import { TasksModule } from "./tasks/tasks.module";
import { NotFoundInterceptor } from "./interceptors/notFound.interceptor";

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "static"),
			renderPath: "*name",
			serveRoot: "/static",
		}),
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
		ProfileModule,
		TasksModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: NotFoundInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(ParamsMiddleware)
			.exclude({
				path: "static/*path",
				method: RequestMethod.GET,
			})
			.forRoutes("*");
	}
}
