
import { pool } from "../../db";
import type { USER } from "./auth.interface";
import bcrypt from "bcrypt";

// register a user into DB
const createUserIntoDB = async (payload: USER) => {
    const { name, email, password, role } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const insertIntoDB = await pool.query(`
        INSERT INTO users(name,email,password,role) VALUES( $1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
    `, [name, email, hashPassword, role]);
    delete insertIntoDB.rows[0].password;
    return insertIntoDB;
};

export const authService = {
    createUserIntoDB,
}