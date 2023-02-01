import { Users } from 'src/entities/users.entity';
import Errors from 'src/errors.enum';
import errorGenerator from 'src/utils/errorGenerator.utils';
import { Repository } from 'typeorm';

const getUser = async (
  repository: Repository<Users>,
  user_id: number,
  select: string[] = ['*'],
  reportIfNotFound = true,
) => {
  const find = await repository
    .createQueryBuilder('users')
    .select(select)
    .where('users.user_id = :user_id', { user_id })
    .getRawOne();

  if (!find && reportIfNotFound) errorGenerator(Errors.USER_NOT_FOUND);

  return find;
};

export { getUser };
