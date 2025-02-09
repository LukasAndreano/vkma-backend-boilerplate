import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import basicAuth from "express-basic-auth";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		cors: true,
	});

	app.useGlobalFilters(new HttpExceptionFilter());

	app.set("trust proxy", 1);

	const config = new DocumentBuilder()
		.setTitle("Документация по API")
		.setVersion("1.0")
		.build();

	app.use(
		["/docs", "/docs-json"],
		basicAuth({
			challenge: true,
			users: {
				devs: process.env.DOCS_PASSWORD,
			},
		}),
	);

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, document);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: false,
			transformOptions: { enableImplicitConversion: true },
			disableErrorMessages: process.env.NODE_ENV !== "dev",
		}),
	);

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
