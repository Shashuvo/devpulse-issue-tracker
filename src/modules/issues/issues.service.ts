import { pool } from "../../db";

// create issues in DB
const createIssuesIntoDB = async (payload: any, reporter_id: string) => {
    const { title, description, type, status } = payload;

    const insertIssuesIntoDB = await pool.query(`
        INSERT INTO issues(title, description, type, status, reporter_id) VALUES( $1, $2, $3, COALESCE($4, 'open'), $5) RETURNING *
    `, [title, description, type, status, reporter_id]);

    return insertIssuesIntoDB.rows[0];
}

export const issuesService = {
    createIssuesIntoDB,
}