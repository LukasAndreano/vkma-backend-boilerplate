import { ExceptionFilter, HttpException, ArgumentsHost } from "@nestjs/common";
import appRoot from "app-root-path";

export class HttpExceptionFilter implements ExceptionFilter {
	public catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		if (request.originalUrl.startsWith("/static"))
			return response.sendFile(`${appRoot.path}/static/public/404.html`);

		try {
			const status = exception.getStatus();

			response.status(status).json(exception.getResponse());
		} catch {
			console.error(exception);

			response.status(500).json({
				message: "Internal Server Error",
				statusCode: 500,
			});
		}
	}
}
