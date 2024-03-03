import { validationResult } from "express-validator";
import * as dotenv from "dotenv";
import userService from "../services/userService.js";
import ApiError from "../exceptions/apiError.js";
dotenv.config();
class userController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        }
        catch (e) {
            next(e);
            // res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activcateLink = req.params.link;
            await userService.activate(activcateLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            console.log("a");
            res.json("server Ok");
        }
        catch (e) {
            next(e);
        }
    }
}
export default new userController();
