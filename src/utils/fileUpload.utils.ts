import { extname } from 'path';
import generateRandomName from './generateRandomName.utils';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|svg|png|webp)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, `${generateRandomName(64)}${fileExtName}`);
};
