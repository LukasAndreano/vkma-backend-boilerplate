import { Injectable, NestMiddleware } from "@nestjs/common";
import { ParamsService } from "./params.service";
import checkHash from "vkminiapps-params-checker";
import { UserDataDto } from "src/dto/user-data.dto";
import { Request, Response } from "express";

@Injectable()
export class ParamsMiddleware implements NestMiddleware {
	constructor(private readonly paramsService: ParamsService) {}

	async use(req: Request, res: Response, next: () => void) {
		const authorizationToken = req.headers.authorization?.slice(7) || "";

		if (
			!checkHash(
				authorizationToken,
				process.env.APP_SECRET_KEY,
				+process.env.AUTHORIZATION_LIFETIME || 0,
			)
		)
			return res.status(401).json({
				response: false,
				statusCode: 401,
				errorCode: 0,
			});

		const user_id = +authorizationToken.split("vk_user_id=")[1].split("&")[0];

		const user: UserDataDto = await this.paramsService.getUser(user_id);

		req.headers["user-data"] = JSON.stringify(user);

		next();
	}
}
