import { Uploads } from "src/entities/uploads.entity";
import Errors from "src/errors.enum";
import { findUpload } from "src/queries/uploads.queries";
import { Repository } from "typeorm";
import errorGenerator from "./errorGenerator.utils";

interface Response {
  url: string;
  id: number;
}

const validateImage = async (
  repository: Repository<Uploads>,
  image_id: number,
  user_id: number | null,
): Promise<Response> => {
  const findImage = await findUpload(repository, image_id, ["*"], user_id);

  if (!findImage) errorGenerator(Errors.PHOTO_NOT_FOUND);

  return {
    url: findImage.url,
    id: findImage.id,
  };
};

export default validateImage;
