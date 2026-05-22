import { pool } from "../db";

const dbQuery = (query: string, values?: unknown[]) => pool.query(query, values);

export default dbQuery;