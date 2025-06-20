import pool from "../config/db";

export const createTask = async (title: string, description: string, userId: number, categoryId?: number) => {
    let result;
    if (categoryId == null) { 
        result = await pool.query(
            'INSERT INTO tasks (title, description, created_by) VALUES ($1, $2, $3) RETURNING *',
            [title, description, userId] 
        );
    } else {
        result = await pool.query(
            'INSERT INTO tasks (title, description, created_by, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, userId, categoryId] 
        );
    }
    return result.rows[0];
}

export const getTask = async (userId: number, categoryId?: number) => {
    let result;
    if (categoryId== null) {
        result = await pool.query('SELECT * FROM tasks WHERE created_by=$1 ORDER BY title ASC;', [userId]);
    } else {
        result = await pool.query('SELECT * FROM tasks WHERE created_by=$1 and category_id=$2 ORDER BY title ASC;', [userId, categoryId]);
    }
    return result.rows;
}
export const getTaskById = async (userId: number, taskId: number, categoryId?: number) => {
    let result;
    if (categoryId == null) {
        result = await pool.query('SELECT * FROM tasks WHERE created_by=$1 AND id=$2 ORDER BY title ASC;', [userId, taskId]);
    } else {
        result = await pool.query('SELECT * FROM tasks WHERE created_by=$1 and category_id=$2 AND id=$3 ORDER BY title ASC;', [userId, categoryId, taskId]);
    }
    return result.rows[0];
}

export const updateTask = async (userId: number, taskId: number, title: string, description: string, categoryId: number) => {
    const result = await pool.query(
        'UPDATE tasks SET title=$3, description=$4, category_id=$5, updated_by=$1 WHERE created_by=$1 and id=$2', 
        [userId, taskId, title, description, categoryId]);
    return result.rows[0];
}

export const deleteTask = async (userId: number, taskId: number) => {
    await pool.query('DELETE FROM tasks WHERE created_by=$1 and id=$2', [userId, taskId]);
}