import { Request, Response } from "express";
import * as check from "vkminiapps-params-checker";
import query from "../utils/database";

export default async (req: Request, res: Response, next) => {
  if (req.method === "OPTIONS") return next();

  if (!req.headers.authorization) return res.reply.error(0, 401);

  const parsedAuthParams = req.headers.authorization.slice(7);

  if (
    !check(
      parsedAuthParams,
      process.env.SERVICE_KEY,
      +process.env.AUTHORIZATION_LIFETIME
    )
  )
    return res.reply.error(0, 401);

  // Getting user_id from params
  const user_id: number = +parsedAuthParams
    .split("vk_user_id=")[1]
    .split("&")[0];

  // Getting user data from database
  const user = await query(`SELECT * FROM users WHERE user_id = ?`, [user_id]);

  if (user.length === 0)
    await query(`INSERT INTO users (user_id) VALUES (?)`, [user_id]);

  req.user = {
    ...(user[0] ?? {
      user_id,
    }),
  };

  next();
};
