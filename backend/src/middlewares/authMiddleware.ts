import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
        next();
    } else{
        res.status(403).json({ message: 'Unauthorized'});
    }
};