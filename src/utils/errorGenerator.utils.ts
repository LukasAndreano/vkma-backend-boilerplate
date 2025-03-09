import { HttpException } from "@nestjs/common";

interface IErrorGenerator {
	errorCode: number;
	message: string;
}

interface IErrorGeneratorReturn {
	status: boolean;
	errorCode: number;
	message: string;
}

const errorGenerator = (errorCode: IErrorGenerator): IErrorGeneratorReturn => {
	throw new HttpException(
		{
			status: false,
			...errorCode,
		},
		400,
	);
};

export default errorGenerator;
