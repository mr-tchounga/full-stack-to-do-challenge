import pool from "../config/db";

export const createCategory = async (title: string, userId: number) => {
    let result = await pool.query(
        'INSERT INTO categories (title, created_by) VALUES ($1, $2) RETURNING *',
        [title, userId] 
    );    
    return result.rows[0];
}

export const getCategory = async (userId: number) => {
    let result = await pool.query('SELECT * FROM categories WHERE created_by=$1', [userId]);
    return result.rows[0];
}

export const updateCategory = async (userId: number, categoryId: number, title: string) => {
    const result = await pool.query(
        'UPDATE categories SET title=$3, updated_by=$1 WHERE created_by=$1 and id=$2', 
        [userId, categoryId, title]);
    return result.rows[0];
}

export const deleteCategory = async (userId: number, categoryId: number) => {
    await pool.query('DELETE FROM categories WHERE created_by=$1 and id=$2', [userId, categoryId]);
}