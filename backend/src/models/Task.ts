
export interface Task {
    id: number;
    title: string;
    description: string;
    category_id: number;
    created_at: Date;
    created_by: number;
    updated_at: Date;
    updated_by: number;
}