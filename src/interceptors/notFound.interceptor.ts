import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { NextFunction } from "express";
import * as appRootPath from "app-root-path";

@Catch()
export class NotFoundInterceptor implements ExceptionFilter {
	catch(exception: { code?: string }, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const next = ctx.getNext<NextFunction>();

		if (exception.code === "ENOENT")
			return response.sendFile(`${appRootPath}/static/public/404.html`);

		next(exception);
	}
}
