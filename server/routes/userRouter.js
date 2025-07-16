import express from "express";
import { login, registerAdmin } from "../controller/authController.js";

const userRouter = express.Router();

userRouter.post("/register-admin", registerAdmin);
userRouter.post("/login", login);

export default userRouter;
