import { Response, Router } from "express";
import { auth } from "../middlewares/auth";
import { prismaClient } from "../app";
import { TypedRequest } from "../types";
import { check } from "express-validator";
const router = Router();

type OrderBody = {
  id: number;
};

router.post("/", [auth, check("id").exists()], async (req: TypedRequest<OrderBody>, res: Response) => {
  try {
    const basket = await prismaClient.basket.findFirst({ where: { id: req.body.id }, include: { items: true } });
    if (req.user && basket) {
      const newOrder = {
        ...basket,
        items: basket.items.map((el) => {
          const { orderId, id, basketId, ...rest } = el;
          return rest;
        }),
      };
      await prismaClient.order.create({
        data: { allPrice: newOrder.allPrice, userId: basket.userId, items: { create: newOrder.items } },
      });
      await prismaClient.basket.delete({ where: { userId: req.user.id } });
      res.json({ message: "Заказ успешно сформирован" });
    } else {
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Что-то пошло не так" });
  }
});

router.get("/", auth, async (req: TypedRequest<never>, res: Response) => {
  try {
    if (req.user) {
      let orders =
        (await prismaClient.order.findMany({ where: { userId: req.user.id }, include: { items: true } })) || {};
      res.json(orders);
    } else {
      res.end();
    }
  } catch (e) {
    res.status(500).json({ message: "Ошибка получения заказов" });
  }
});

module.exports = router;
