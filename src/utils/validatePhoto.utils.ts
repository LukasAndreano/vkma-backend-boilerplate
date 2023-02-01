import { Uploads } from 'src/entities/uploads.entity';
import Errors from 'src/errors.enum';
import { findUpload } from 'src/queries/uploads.queries';
import { Repository } from 'typeorm';
import errorGenerator from './errorGenerator.utils';

interface Response {
  photo_url: string;
  photo_id: number;
}

const validatePhoto = async (
  repository: Repository<Uploads>,
  photo_id,
  user_id,
): Promise<Response> => {
  const findPhoto = await findUpload(repository, photo_id, ['*'], user_id);

  if (findPhoto) {
    return {
      photo_url: findPhoto.url,
      photo_id: findPhoto.id,
    };
  } else {
    errorGenerator(Errors.PHOTO_NOT_FOUND);
  }
};

export default validatePhoto;
