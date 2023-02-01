import { Uploads } from 'src/entities/uploads.entity';
import { Repository } from 'typeorm';

const findUpload = async (
  repository: Repository<Uploads>,
  id: number,
  select: string[] = ['*'],
  user_id?: number,
) => {
  return await repository
    .createQueryBuilder('uploads')
    .select(select)
    .where('uploads.id = :id', { id })
    .andWhere('uploads.uploaded_by = :user_id', { user_id })
    .getRawOne();
};

export { findUpload };
