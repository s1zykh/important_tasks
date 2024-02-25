import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { Users } from "../models/models.js";

class userController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
    } catch (e) {
      console.log("Ошибка", e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: Request, res: Response) {
    try {
    } catch (e) {
      console.log("Ошибка", e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      console.log("a");

      res.json("server Ok");
    } catch (e) {}
  }
}

export default new userController();
