import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const checkProvidedParams = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = errors.array({ onlyFirstError: true })[0];

    return res.reply.error(0, 400, {
      code: 3,
      msg: `Wrong value provided: ${error.msg}`,
      param: error.param,
    });
  }

  return true;
};
