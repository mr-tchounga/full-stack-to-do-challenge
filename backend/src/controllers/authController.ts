import { Request, Response } from 'express';
import { getUserByEmail } from '../services/userService';
import { comparePasswords } from "../utils/hash";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: 'No user found with Email'});
    }
    
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid Password'});
    }
    
    req.session.userId = user.id;
    req.session.role = user.role;
    
    res.status(200).json({ message: 'Login Successful!'});
}

export const logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ name: err.name, message: err.message });
        }
        
        res.status(200).json({ message: 'Logout Successful!'});
    })
}