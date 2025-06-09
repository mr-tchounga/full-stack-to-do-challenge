import { Router } from "express";
import { create, get, update, remove } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();

router.post('/:category_id/task/', isAuthenticated, create);
router.get('/:category_id/task/', isAuthenticated, get);
router.get('/:category_id/task/:id', isAuthenticated, get);
router.put('/:category_id/task/:id', isAuthenticated, update);
router.delete('/:category_id/task/:id', isAuthenticated, remove);

export default router;