import { Router } from "express";
const Addons = require("../models/Addons");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const addons = await Addons.find();
    res.json({ addons });
  } catch (e) {
    res.status(500).json({ message: "Ошибка" });
  }
});

module.exports = router;
