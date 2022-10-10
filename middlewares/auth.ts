import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { keys } from "../keys/keys";

export const auth = (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Вы не авторизированы" });
    }
    req.user = jwt.verify(token, keys.SESSION_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ message: "Вы не авторизированы" });
  }
};
