import { Response } from "express";
import errorCodes from "../errorCodes.json";

class response {
  res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  success(data: Object) {
    this.#sendResponse(200, true, data);
  }

  error(errorCode: number, code?: number, message?: object) {
    this.#sendResponse(code ?? 400, false, {
      error: {
        ...(message ?? errorCodes[errorCode]),
      },
    });
  }

  server(e: Error) {
    console.log(e);

    this.#sendResponse(500, false, errorCodes[2]);
  }

  #sendResponse(code = 200, response = true, data = {}) {
    this.res.status(code).json({
      response,
      ...data,
    });
  }
}

export default response;
