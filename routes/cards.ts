import { Router } from "express";
import { prisma } from "../app";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (e) {
    res.status(400).json({ message: `Что-то пошло не так` });
  }
});

module.exports = router;
