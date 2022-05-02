import * as express from "express";
import { Request, Response } from "express"

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.reply.success({
    user: {
      admin: Boolean(req.user.admin),
    },
  });
});

module.exports = router;
