import { Router } from "express";
import { login, logout, check } from "../controllers/authController";

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', check);

export default router;