import { Request, Response } from 'express';
import { createUser, getUserByEmail } from "../services/userService";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    const user = await createUser(username, email, password, role);
    return res.status(201).json(user)
}

export const getUserProfile = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    return res.status(200).json(user)
}
