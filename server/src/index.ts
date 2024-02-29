import express, { Express, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./db.js";
import routerUser from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const PORT = 3000;
const app: Express = express();

app.use(json());
app.use(cors());
app.use(cookieParser());
app.use("/api", routerUser);
app.use(errorMiddleware);
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); //{ force: true }
    app.listen(PORT, () => {
      console.log("server");
    });
  } catch (error) {
    console.log(error);
  }
}

start();
