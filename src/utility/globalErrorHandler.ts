import type { NextFunction, Request, Response } from "express";
import sendResponse from "./sendResponse";
import type { CatchError } from "./catchError";

const globalErrorHandler = (err: CatchError, req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        statusCode: 500,
        success: false,
        message: err.message || "Internal Server Error",
    })
};

export default globalErrorHandler;