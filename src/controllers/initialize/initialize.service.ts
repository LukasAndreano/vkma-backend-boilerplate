import { Injectable } from "@nestjs/common";
import { UserDataDto } from "src/dto/user-data.dto";
import { InitializeData } from "./dto/initialize-data.dto";

@Injectable()
export class InitializeService {
	async initialize(user: UserDataDto): Promise<InitializeData> {
		return {
			id: user.id,
			name: user.name,
			avatar: user.avatar,
			notifications: user.notifications,
		};
	}
}
