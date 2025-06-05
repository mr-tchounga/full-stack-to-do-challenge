import pool from "../config/db";
import { hashPassword } from "../utils/hash";

export const createUser = async (username: string, email: string, password: string, role?: string) => {
    const hashedPassword = await hashPassword(password);
    if (role == null) { role = 'user'}
    const result = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, hashedPassword, role] 
    );
    return result.rows[0];
}

export const getUserByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return result.rows[0];
}