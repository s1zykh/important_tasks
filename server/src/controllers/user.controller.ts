import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { Users } from "../models/models.js";
import userService from "../services/userService.js";

class userController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
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
  async logout(req: Request, res: Response) {
    try {
    } catch (e) {
      console.log("Ошибка", e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async activate(req: Request, res: Response) {
    try {
    } catch (e) {
      console.log("Ошибка", e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async refresh(req: Request, res: Response) {
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
