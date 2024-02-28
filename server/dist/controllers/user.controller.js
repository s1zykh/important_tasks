import userService from "../services/userService.js";
class userController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        }
        catch (e) {
            console.log("Ошибка", e);
            res.status(400).json({ message: "Registration error" });
        }
    }
    async login(req, res) {
        try {
        }
        catch (e) {
            console.log("Ошибка", e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async logout(req, res) {
        try {
        }
        catch (e) {
            console.log("Ошибка", e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async activate(req, res) {
        try {
        }
        catch (e) {
            console.log("Ошибка", e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async refresh(req, res) {
        try {
        }
        catch (e) {
            console.log("Ошибка", e);
            res.status(400).json({ message: "Login error" });
        }
    }
    async getUsers(req, res) {
        try {
            console.log("a");
            res.json("server Ok");
        }
        catch (e) { }
    }
}
export default new userController();
