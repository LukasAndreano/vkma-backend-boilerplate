import { Injectable, NestMiddleware } from "@nestjs/common";
import { ParamsService } from "./params.service";
import checkHash from "vkminiapps-params-checker";
import { UserDataDto } from "src/dto/user-data.dto";
import { FastifyRequest } from "fastify";
import errorGenerator from "src/utils/errorGenerator.utils";
import Errors from "src/errors.enum";

interface RequestWithUser extends FastifyRequest {
	headers: FastifyRequest["headers"] & {
		userData?: UserDataDto;
	};
}

@Injectable()
export class ParamsMiddleware implements NestMiddleware {
	constructor(private readonly paramsService: ParamsService) {}

	async use(req: RequestWithUser, _, next: () => void) {
		const authorizationToken = req.headers.authorization?.slice(7) || "";

		if (!checkHash(authorizationToken, process.env.APP_SECRET_KEY, 0))
			errorGenerator(Errors.ACCESS_DENIED);

		const user_id = +authorizationToken.split("vk_user_id=")[1].split("&")[0];

		const user: UserDataDto = await this.paramsService.getUser(user_id);

		req.headers.userData = user;

		next();
	}
}
