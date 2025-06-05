import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
        next();
    } {
        res.status(401).json({ message: 'Unauthorized'});
    }
};