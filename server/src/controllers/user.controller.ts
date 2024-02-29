import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

import userService from "../services/userService.js";
import ApiError from "../exceptions/apiError.js";

class userController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка при валидации"));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
      // res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activcateLink = req.params.link;
      await userService.activate(activcateLink);
      return res.redirect(process.env.CLIENT_URL as string);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("a");
      res.json("server Ok");
    } catch (e) {
      next(e);
    }
  }
}

export default new userController();
