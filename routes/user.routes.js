import express from "express";
import { login, registerUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/login", login);
router.get("/register", registerUser);

export default router;
