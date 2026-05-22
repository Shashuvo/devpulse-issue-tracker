
import config from "../../config";
import dbQuery from "../../utility/dbQuery";
import type { CREDENTIALS, USER } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

// register a user into DB
const createUserIntoDB = async (payload: USER) => {
    const { name, email, password, role } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

    const insertIntoDB = await dbQuery(`
    INSERT INTO users(name, email, password, role) VALUES( $1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
    `, [name, email, hashPassword, role]);
    delete insertIntoDB.rows[0].password;
    return insertIntoDB;
};



// get user from DB through login
const getUserFromDB = async (payload: CREDENTIALS) => {
    const { email, password } = payload;

    const userData = await dbQuery(`
    SELECT * FROM users WHERE email = $1
    `, [email]);

    if (userData.rows.length === 0) {
        throw new Error("Invalid credentials!");
    }

    const user = userData.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        throw new Error("Invalid password!")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
    }

    const accessToken = jwt.sign(jwtPayload, config.secret, { expiresIn: "1d" });


    delete user.password;

    return { "token": accessToken, "user": user };
}

export const authService = {
    createUserIntoDB,
    getUserFromDB,
}