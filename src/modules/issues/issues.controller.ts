import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issuesService } from "./issues.service";

// create a issue
const createIssues = async (req: Request, res: Response) => {
    try {
      const result = await issuesService.createIssuesIntoDB(req.body);  
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
};


export const issuesController = {
    createIssues,
}