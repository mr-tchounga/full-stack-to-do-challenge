import { Request, Response } from 'express';
import { createTask, getTask, updateTask, deleteTask } from '../services/taskService';

export const create = async (req: Request, res: Response) => {
    const { title, description, categoryId } = req.body;
    const userId = req.session.userId;
    const task = await createTask(title, description, userId!, categoryId);
    return res.status(200).json(task)
}

export const get = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.categoryId, 10);
    const userId = req.session.userId;
    const task = await getTask(userId!, categoryId);
    return res.status(200).json(task)
}

export const update = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, categoryId } = req.body;
    const userId = req.session.userId;
    const task = await updateTask(userId!, taskId, title, description, categoryId);
    return res.status(200).json(task)
}

export const remove = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);
    const userId = req.session.userId;
    await deleteTask(userId!, taskId);
    return res.status(200).json({ message: 'Operation Successful!'});
}
