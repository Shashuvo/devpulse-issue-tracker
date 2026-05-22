import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized access!",
                })
            };

            const decoded = jwt.verify(token as string, config.secret) as JwtPayload;

            const userData = await pool.query(`
            SELECT * FROM users WHERE email = $1
        `, [decoded.email]);


            if (userData.rows.length === 0) {
                sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: "User not found!",
                })
            };
            if (roles.length && !roles.includes(userData.rows[0].role)) {
                console.log("no access");
                sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Forbidden! This role have no access.",
                })
            };

            req.user = decoded;

            next();
        } catch (error) {
            next(error);
        }
    }
}

export default auth;