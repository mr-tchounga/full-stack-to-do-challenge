import { Router } from "express";
import { create, get, update, remove } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post('/', isAuthenticated, create);
router.get('/', isAuthenticated, get);
router.put('/:id', isAuthenticated, update);
router.delete('/:id', isAuthenticated, remove);

export default router;