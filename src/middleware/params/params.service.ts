import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDataDto } from "src/dto/user-data.dto";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class ParamsService {
	constructor(
		@InjectRepository(Users)
		private readonly usersRepository: Repository<Users>,
	) {}

	async getUser(user_id: number): Promise<UserDataDto> {
		let user = await this.usersRepository
			.createQueryBuilder("users")
			.select(["*"])
			.where("users.user_id = :user_id", { user_id })
			.getRawOne();

		if (!user) {
			const values = {
				user_id,
			};

			const insertAction = await this.usersRepository
				.createQueryBuilder()
				.insert()
				.into(Users)
				.values(values)
				.execute();

			user = {
				...values,
				id: insertAction.identifiers[0].id,
			};
		}

		return user;
	}
}
