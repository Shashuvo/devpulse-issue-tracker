import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connectionString as string,
});

export const initDB = async () => {
    console.log(config.connectionString);
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(60) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'contributor',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log("Database connected successfully!!!");
    } catch (error) {
        console.log(error)
    }
}