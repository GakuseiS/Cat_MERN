import { Router } from "express";
const router = Router();
import { prisma } from "../app";

router.get("/", async (req, res) => {
  try {
    const addons = await prisma.addon.findMany();
    res.json(addons);
  } catch (e) {
    res.status(500).json({ message: "Ошибка" });
  }
});

module.exports = router;
