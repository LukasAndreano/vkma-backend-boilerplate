import { Request, Response } from "express";

export default async (req: Request, res: Response, next) => {
  if (req.method === "OPTIONS" || !req.url.includes("admin")) return next();

  if (!req.user.admin) return res.reply.error(0, 401);

  next();
};
