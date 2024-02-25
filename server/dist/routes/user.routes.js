import { Router } from "express";
import userController from "../controller/user.controller.js";
const router = Router();
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/users", userController.getUsers);
export default router;
