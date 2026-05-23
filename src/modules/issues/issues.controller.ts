import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";
import { issuesService } from "./issues.service";
import type { ISSUE_QUERY } from "./issues.interface";

// create a issue
const createIssues = async (req: Request, res: Response) => {
    try {
        const reporter_id = req.user.id;
        const result = await issuesService.createIssuesIntoDB(req.body, reporter_id);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result
        });

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error.errors
        })
    }
};

// get single issue
const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await issuesService.getSingleIssueFromDB(id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error.errors
        })
    }
};

// update issue
const updateIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { id: user_id, role: user_role } = req.user;
        const result = await issuesService.updateIssueIntoDB(id as string, req.body, user_id, user_role);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: result
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error.errors
        })
    }
}

// delete issue
const deleteIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await issuesService.deleteIssueFromDB(id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error.errors
        })
    }
}

// get all issues
const getAllIssues = async (req: Request, res: Response) => {
    try {
        const query = req.query as unknown as ISSUE_QUERY;
        const result = await issuesService.getAllIssuesFromDB(query);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result,
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error.errors
        })
    }
}


export const issuesController = {
    createIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue,
    getAllIssues
}