import * as express from "express";
import { Request, Response } from "express";

import { body, matchedData } from "express-validator";
import { checkProvidedParams } from "../../../utils/validator";
import query from "../../../utils/database";

const router = express.Router();

interface BodyParams {
  notifications?: boolean;
}

router.patch(
  "/",
  [body("notifications", "must be boolean").isBoolean().optional()],
  async (req: Request, res: Response) => {
    if (checkProvidedParams(req, res)) {
      const bodyParams: BodyParams = matchedData(req);

      const keys = Object.keys(bodyParams);

      if (keys.length > 0)
        await query(
          `UPDATE users SET ${keys.join(" = ? AND ")} = ? WHERE user_id = ?`,
          [...Object.values(bodyParams), req.user.user_id]
        );

      res.reply.success();
    }
  }
);

module.exports = router;
