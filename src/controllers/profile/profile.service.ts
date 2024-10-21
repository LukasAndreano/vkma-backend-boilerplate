import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { UserDataDto } from "src/dto/user-data.dto";
import { Users } from "src/entities/users.entity";
import Errors from "src/errors.enum";
import errorGenerator from "src/utils/errorGenerator.utils";
import { Repository } from "typeorm";
import { ProfilePatchBody } from "./dto/profile-body.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async updateProfile(
    user: UserDataDto,
    body: ProfilePatchBody,
  ): Promise<boolean> {
    if (body.notifications) {
      const notifications = await axios.get(
        `https://api.vk.com/method/apps.isNotificationsAllowed?user_id=${user.user_id}&access_token=${process.env.APP_TOKEN}&v=5.201`,
      );

      if (!notifications.data.response.is_allowed)
        errorGenerator(Errors.NOTIFICATIONS_DISABLED);
    }

    if (Object.keys(body))
      await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set(body)
        .where("id = :id", { id: user.id })
        .execute();

    return true;
  }
}
