import { HttpException } from '@nestjs/common';

interface IErrorGenerator {
  errorCode: number;
  message: string;
  data?: any;
}

interface IErrorGeneratorReturn {
  status: boolean;
  errorCode: number;
  message: string;
  data?: any;
}

const errorGenerator = (errorCode: IErrorGenerator): IErrorGeneratorReturn => {
  throw new HttpException(
    {
      status: false,
      ...errorCode,
    },
    200,
  );
};

export default errorGenerator;
