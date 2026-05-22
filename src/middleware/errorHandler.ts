import type { NextFunction, Request, Response } from "express";
import type AppError from "../utility/appError";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        errors: err.message,
    });
};

export default errorHandler;