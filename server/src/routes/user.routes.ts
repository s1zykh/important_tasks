import { Router } from "express";

import userController from "../controllers/user.controller.js";
import authValidation from "../validations/authValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/registration", authValidation, userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

export default router;
