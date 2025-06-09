import { Request, Response } from 'express';
import { createTask, getTask, getTaskById, updateTask, deleteTask } from '../services/taskService';

export const create = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const userId = req.session.userId;
    const categoryId = parseInt(req.params.category_id, 10);
    const task = await createTask(title, description, userId!, categoryId);
    return res.status(200).json(task)
}

export const get = async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const taskId = req.params.id ? parseInt(req.params.id, 10) : undefined;
    const categoryId = req.params.category_id ? parseInt(req.params.category_id, 10) : null;
    let task 
    if (taskId){
        console.log(`userId: ${userId}, taskId: ${taskId}, categoryId: ${categoryId}`)
        task = await getTaskById(userId!, taskId, categoryId!);
    } else {
        console.log(`userId: ${userId}, categoryId: ${categoryId}`)
        task = await getTask(userId!, categoryId!);
    }
    return res.status(200).json(task)
}

export const update = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, categoryId } = req.body;
    const userId = req.session.userId;
    // if (categoryId == null) {}
    const task = await updateTask(userId!, taskId, title, description, categoryId);
    return res.status(200).json(task)
}

export const remove = async (req: Request, res: Response) => {
    const taskId = parseInt(req.params.id, 10);
    const userId = req.session.userId;
    await deleteTask(userId!, taskId);
    return res.status(200).json({ message: 'Operation Successful!'});
}
