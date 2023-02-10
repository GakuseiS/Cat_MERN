import { Response, Router } from "express";
import { prismaClient } from "../app";
const router = Router();

router.get("/", async (_, res: Response) => {
  try {
    const addons = await prismaClient.product.findMany({ where: { type: "addon" } });
    res.json(addons);
  } catch (e) {
    res.status(500).json({ message: "Ошибка получения продуктов" });
  }
});

module.exports = router;
