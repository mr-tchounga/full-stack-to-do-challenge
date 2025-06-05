import { Router } from "express";
import { registerUser, getUserProfile } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post('/register', registerUser);
router.post('/profile', isAuthenticated, getUserProfile);

export default router;