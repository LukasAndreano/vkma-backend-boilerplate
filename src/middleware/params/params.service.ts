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
		let user = await this.usersRepository.findOne({ where: { user_id } });

		if (!user) {
			const values = {
				user_id,
			};

			const newUser = this.usersRepository.create(values);

			newUser.setJoinedAt();

			const insertAction = await this.usersRepository.save(newUser);

			user = insertAction;
		}

		return user;
	}
}
