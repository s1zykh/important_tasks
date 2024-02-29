import { validationResult } from "express-validator";
import userService from "../services/userService.js";
import ApiError from "../exceptions/apiError.js";
class userController {
    async registration(req, res, next) {
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
        }
        catch (e) {
            next(e);
            // res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res, next) {
        try {
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
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
