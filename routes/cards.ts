import { Response, Router } from "express";
import { prismaClient } from "../app";
const router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const cards = await prismaClient.product.findMany({ where: { type: "main" } });
    res.json(cards);
  } catch (e) {
    res.status(400).json({ message: "Ошибка получения продуктов" });
  }
});

module.exports = router;
