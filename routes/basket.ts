import { prismaClient } from "../app";
import { Request, Response, Router } from "express";
import { auth } from "../middlewares/auth";
import { TypedRequest } from "../types";
const router = Router();

router.get("/", auth, async (req: TypedRequest<null>, res: Response) => {
  try {
    if (req.user) {
      let basket = await prismaClient.basket.findFirst({
        where: { userId: req.user.id },
        include: {
          items: true,
        },
      });
      if (!basket) {
        return res.json({ allPrice: 0 });
      }
      res.json(basket);
    } else {
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.json({ message: "Ошибка получения корзины" });
  }
});

//Нужно добавить item в корзину, необходим расчет колличества и общей цены
router.post("/", auth, async (req: TypedRequest<{ id: string }>, res: Response) => {
  try {
    if (req.user) {
      const productId = req.body.id;
      let newProduct = await prismaClient.product.findUnique({ where: { id: productId } });
      let basket = await prismaClient.basket.findUnique({ where: { userId: req.user.id }, include: { items: true } });

      if (newProduct) {
        const idx = basket?.items.findIndex((el) => el.productId === productId);
        if (idx === -1 || !basket) {
          const queryPayload = {
            items: {
              create: {
                productId,
                title: newProduct.title,
                size: newProduct.size,
                taste: newProduct.taste,
                price: newProduct.price,
                count: 1,
              },
            },
            allPrice: basket ? basket.allPrice + newProduct.price : newProduct.price,
            userId: req.user.id,
          };
          await prismaClient.basket.upsert({
            where: { userId: req.user.id },
            create: queryPayload,
            update: queryPayload,
          });
        } else if (typeof idx === "number") {
          await prismaClient.basket.update({
            where: { userId: req.user.id },
            data: {
              items: {
                update: {
                  where: { id: basket.items[idx].id },
                  data: {
                    count: basket.items[idx].count + 1,
                  },
                },
              },
              allPrice: basket.allPrice + newProduct.price,
              userId: req.user.id,
            },
          });
        }
      }

      res.status(200).json({ message: "Товар добавлен в корзину" });
    } else {
      res.end();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/", auth, async (req: TypedRequest<null>, res: Response) => {
  try {
    if (req.user) {
      await prismaClient.basket.delete({ where: { userId: req.user.id }, include: { user: true } });
      return res.status(200).json({ message: "Корзина очищена" });
    }
    res.end();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка очищения корзины" });
  }
});

router.delete("/:id", auth, async (req: any, res) => {
  try {
    let basket = await prismaClient.basket.findFirst({ where: { userId: req.user.id }, include: { items: true } });

    if (basket) {
      const basketItemId = +req.params.id;
      if (basket.allPrice === 0) {
        await prismaClient.basket.delete({ where: { userId: +req.user.id } });
      } else {
        const basketItem = await prismaClient.cardItem.findFirst({ where: { id: basketItemId } });
        if (basketItem) {
          if (basketItem.count > 1) {
            await prismaClient.basket.update({
              where: { userId: req.user.id },
              data: {
                allPrice: basket.allPrice - basketItem.price,
                items: { update: { where: { id: basketItemId }, data: { count: basketItem.count - 1 } } },
              },
            });
          } else {
            await prismaClient.basket.update({
              where: { userId: req.user.id },
              data: {
                allPrice: basket.allPrice - basketItem.price,
                items: { delete: { id: basketItemId } },
              },
            });
          }
        }
      }
    }

    res.status(200).json({ message: "Продукт успешно удален" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ошибка удаления продукта" });
  }
});

module.exports = router;
