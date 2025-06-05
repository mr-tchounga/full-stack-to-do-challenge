import { Response } from "express";

export const errorHandler = (err: Error, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ name: err.name, message: err.message });
};