import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { join } from "node:path";

async function bootstrap() {
	const fastifyAdapter = new FastifyAdapter({
		trustProxy: true,
	});

	fastifyAdapter.enableCors({
		credentials: true,
		origin: ["*"],
	});

	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		fastifyAdapter,
	);

	await app.register(multipart, {
		limits: {
			fileSize: 1000 * 1000 * 20,
		},
	});

	const config = new DocumentBuilder()
		.setTitle("Документация по API")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const fastifyInstance = app.getHttpAdapter().getInstance();

	await fastifyInstance.register(fastifyStatic, {
		root: join(__dirname, "..", "static"),
		prefix: "/static/",
	});

	fastifyInstance.addHook("onRequest", async (request, reply) => {
		if (request.raw.url.startsWith("/docs")) {
			const authHeader = request.headers.authorization;

			if (!authHeader) {
				reply.header("WWW-Authenticate", "Basic");

				reply.code(401).send("Authentication required");

				return;
			}

			const base64Credentials = authHeader.split(" ")[1];

			const credentials = Buffer.from(base64Credentials, "base64")
				.toString("ascii")
				.split(":");

			const [username, password] = credentials;

			if (username !== "devs" || password !== process.env.DOCS_PASSWORD) {
				reply.header("WWW-Authenticate", "Basic");

				reply.code(401).send("Invalid credentials");

				return;
			}
		}
	});

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("docs", app, document, {
		customSiteTitle: "API Documentation",
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);

	await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
