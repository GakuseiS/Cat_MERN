import { Router } from "express";
import { check, validationResult } from "express-validator";
import { prisma } from "../app";
const router = Router();

router.post(
  "/",
  [check("name").exists(), check("weight").exists(), check("email").exists(), check("tel").exists()],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Ошибка в заполнении формы" });
    }
    try {
      const { name, weight, age, type, email, tel, comment, sugar, water, milk, vitamin } = req.body;
      await prisma.program.create({
        data: {
          name,
          weight: +weight,
          age: +age,
          type,
          email,
          tel,
          comment,
          addon_sugar: sugar,
          addon_water: water,
          addon_milk: milk,
          addon_vitamin: vitamin,
        },
      });
      res.json({ message: "Данные успешно отправлены на сервер" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то пошло не так" });
    }
  }
);

module.exports = router;
