import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
    const time = new Date().toLocaleString();

    const log = `${time} | ${req.method} | ${req.originalUrl}`;

    fs.appendFile("logger.txt", log, (err) => { });

    next();
};

export default logger;