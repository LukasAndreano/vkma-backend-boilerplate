import { extname } from 'path';
import generateRandomName from './generateRandomName.utils';
import Errors from 'src/errors.enum';
import { HttpException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/) || !req)
    return callback(
      new HttpException(
        {
          status: false,
          ...Errors.ONLY_IMAGES_ARE_ALLOWED,
        },
        200,
      ),
      false,
    );

  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${generateRandomName(64)}${fileExtName}`);
};
