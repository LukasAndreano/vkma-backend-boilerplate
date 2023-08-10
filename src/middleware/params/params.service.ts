import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UserDataDto } from 'src/dto/user-data.dto';
import { Users } from 'src/entities/users.entity';
import getCurrentTimestamp from 'src/utils/getCurrentTimestamp.utils';
import { Repository } from 'typeorm';
import { API } from 'vk-io';
import { UsersGetResponse } from 'vk-io/lib/api/schemas/responses';

@Injectable()
export class ParamsService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUser(user_id: number): Promise<UserDataDto> {
    const api = new API({
      token: process.env.APP_TOKEN,
    });

    let userInfo: UsersGetResponse;

    let name: string;
    let avatar: string;

    let user = await this.usersRepository
      .createQueryBuilder('users')
      .select(['*'])
      .where('users.user_id = :user_id', { user_id })
      .getRawOne();

    if (!user || user.updated_at < getCurrentTimestamp()) {
      userInfo = await api.users.get({
        user_ids: [user_id],
        fields: ['photo_200'],
        lang: 'ru',
      });

      name = userInfo[0].first_name + ' ' + userInfo[0].last_name;
      avatar = userInfo[0].photo_200;

      const notifications = await axios.get(
        `https://api.vk.com/method/apps.isNotificationsAllowed?user_id=${user_id}&access_token=${process.env.APP_TOKEN}&v=5.201`,
      );

      const notifications_from_app = notifications.data.response.is_allowed;

      if (!user) {
        const values = {
          user_id,
          name,
          notifications: notifications_from_app,
          avatar,
          updated_at: getCurrentTimestamp() + 86400,
          joined_at: getCurrentTimestamp(),
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
      } else {
        await this.usersRepository
          .createQueryBuilder()
          .update(Users)
          .set({
            updated_at: getCurrentTimestamp() + 86400,
            name,
            notifications: notifications_from_app,
            avatar,
          })
          .where('user_id = :user_id', { user_id })
          .execute();

        user = {
          ...user,
          name,
          avatar,
        };
      }
    }

    return user;
  }
}
