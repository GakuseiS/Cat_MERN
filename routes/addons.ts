import { Router } from "express";
import { prismaClient } from "../app";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const addons = await prismaClient.addon.findMany();
    res.json(addons);
  } catch (e) {
    res.status(500).json({ message: "Ошибка" });
  }
});

module.exports = router;
