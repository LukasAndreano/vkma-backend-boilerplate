import * as express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.all("/", async (req: Request, res: Response) => {
  res.reply.success();
});

module.exports = router;
