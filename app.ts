import express, { Response, Application, Request } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import cors from "cors";

export const prismaClient = new PrismaClient();
const PORT = process.env.PORT || 5732;
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/form", require("./routes/form"));
app.use("/api/cards", require("./routes/cards"));
app.use("/api/card", require("./routes/basket"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/addons", require("./routes/addons"));
app.use("/api/users", require("./routes/user"));
app.get("/uploads/:path", function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, req.path));
});
app.get("*", function (req, res: Response) {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
