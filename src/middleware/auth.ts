import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config";
import type { ROLES } from "../types";
import dbQuery from "../utility/dbQuery";

const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized access!",
                    errors: "No valid token given"
                })
            };

            const decoded = jwt.verify(token as string, config.secret) as JwtPayload;

            const userData = await dbQuery(`
            SELECT * FROM users WHERE email = $1
            `, [decoded.email]);


            if (userData.rows.length === 0) {
                sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: "User not found!",
                    errors:"No user found with this token"
                })
            };

            const user = userData.rows[0];
            if (roles.length && !roles.includes(user.role)) {
                sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: "Forbidden!",
                    errors: "Your role has no access to this resource"
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