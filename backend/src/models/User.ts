import pool from '../config/db';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    created_at: Date;
    updated_at: Date;
}