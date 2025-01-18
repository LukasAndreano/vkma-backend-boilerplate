import { HttpException } from "@nestjs/common";

interface IErrorGenerator {
	errorCode: number;
	message: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data?: any;
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
		process.env.FORCE_200_FOR_ERRORS === "true" ? 200 : 400,
	);
};

export default errorGenerator;
