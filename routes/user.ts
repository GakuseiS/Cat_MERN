import { Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { prismaClient } from "../app";
import { keys } from "../keys/keys";
import { TypedRequest } from "../types";
const router = Router();

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

router.post(
  "/register",
  [
    check("name").isLength({ min: 3 }).exists(),
    check("email").isEmail(),
    check("password").isLength({ min: 6 }).exists(),
  ],
  async (req: TypedRequest<RegisterBody>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Проверьте правильность ввода данных" });
      }

      const { name, email, password } = req.body;
      const candidate = await prismaClient.user.findFirst({ where: { email } });
      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь существует" });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      await prismaClient.user.create({ data: { name, email, password: hashPassword } });
      res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }
);

router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 }).exists()],
  async (req: TypedRequest<LoginBody>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Проверьте правильность ввода данных" });
      }

      const { email, password } = req.body;
      const candidate = await prismaClient.user.findFirst({ where: { email } });

      if (!candidate) {
        return res.status(400).json({ message: "Такого пользователя нет в системе" });
      }

      const areSame = await bcrypt.compare(password, candidate.password);

      if (!areSame) {
        return res.status(400).json({ message: "Такого пользователя нет в системе" });
      }

      const token = jwt.sign({ id: candidate.id }, keys.SESSION_SECRET);

      res.json({ token, userId: candidate.id });
    } catch (e) {
      res.status(400).json({ message: "Ошибка логина" });
    }
  }
);

module.exports = router;
