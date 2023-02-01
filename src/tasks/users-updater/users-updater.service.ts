import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { API } from 'vk-io';

@Injectable()
export class UsersUpdaterService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  @Cron('0 * * * *', {
    timeZone: 'Europe/Moscow',
  })
  async handleCron() {
    const api = new API({
      token: process.env.APP_SECRET_TOKEN,
    });

    const users = await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.user_id as user_id'])
      .getRawMany();

    const user_ids = users.map((user) => user.user_id);

    for (let i = 0; i < user_ids.length / 100; i++) {
      const chunk = user_ids.slice(i * 100, i * 100 + 100);

      const userInfo = await api.users.get({
        user_ids: chunk,
        fields: ['photo_200'],
        lang: 'ru',
      });

      userInfo.forEach(async (user) => {
        await this.usersRepository
          .createQueryBuilder()
          .update(Users)
          .set({
            name: user.first_name + ' ' + user.last_name,
            avatar: user.photo_200,
          })
          .where('user_id = :user_id', { user_id: user.id })
          .execute();
      });
    }
  }
}
