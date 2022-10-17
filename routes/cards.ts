import { Response, Router } from "express";
import { prismaClient } from "../app";
const router = Router();

router.get("/", async (req, res: Response) => {
  try {
    const cards = await prismaClient.product.findMany({ where: { type: "main" } });
    res.json(cards);
  } catch (e) {
    res.status(400).json({ message: `Что-то пошло не так` });
  }
});

module.exports = router;
