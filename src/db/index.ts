import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.connectionString as string,
});

export const initDB = async () => {
    console.log(config.connectionString);
    try {
        // users Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(60) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) DEFAULT 'contributor' CHECK(role IN('contributor', 'maintainer')),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        // issues table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues (
                id SERIAL PRIMARY KEY,
                title VARCHAR(150) NOT NULL,
                description TEXT NOT NULL,
                type VARCHAR(20) NOT NULL CHECK(type IN('bug', 'feature_request')),
                status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK(status IN('open', 'in_progress', 'resolved')),
                reporter_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);

        console.log("Database connected successfully!!!");
    } catch (error) {
        console.log(error)
    }
}