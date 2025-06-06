import { Request, Response } from 'express';
import { createCategory, getCategory, updateCategory, deleteCategory } from '../services/categoryService';

export const create = async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = req.session.userId;
    const category = await createCategory(title, userId!);
    return res.status(200).json(category)
}

export const get = async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const category = await getCategory(userId!);
    return res.status(200).json(category)
}

export const update = async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = req.session.userId;
    const categoryId = parseInt(req.params.id, 10);
    const category = await updateCategory(userId!, categoryId, title);
    return res.status(200).json(category)
}

export const remove = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id, 10);
    const userId = req.session.userId;
    await deleteCategory(userId!, categoryId);
    return res.status(200).json({ message: 'Operation Successful!'});
}
