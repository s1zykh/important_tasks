class userController {
    async registration(req, res) {
        try {
            const { email, password } = req.body;
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
    async getUsers(req, res) {
        try {
            console.log("a");
            res.json("server Ok");
        }
        catch (e) { }
    }
}
export default new userController();
