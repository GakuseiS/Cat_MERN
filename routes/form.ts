import { Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { prismaClient } from "../app";
import { TypedRequest } from "../types";
const router = Router();

type requestBody = {
  name: string;
  weight: number;
  age: number;
  type: string;
  email: string;
  tel: string;
  comment: string;
  sugar: string;
  water: string;
  milk: string;
  vitamin: string;
};

router.post(
  "/",
  [
    check("name").exists().isString(),
    check("weight").exists().isNumeric(),
    check("email").isEmail(),
    check("tel").isLength({ min: 18, max: 18 }),
  ],
  async (req: TypedRequest<requestBody>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ message: "Ошибка в заполнении формы" });
    }
    try {
      await prismaClient.program.create({
        data: req.body,
      });
      res.json({ message: "Данные успешно отправлены на сервер" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка отправки формы" });
    }
  }
);

module.exports = router;
