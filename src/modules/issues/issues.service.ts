
import AppError from "../../utility/appError";
import dbQuery from "../../utility/dbQuery";
import type { ISSUES, UPDATE_ISSUES } from "./issues.interface";

// create issues in DB
const createIssuesIntoDB = async (payload: ISSUES, reporter_id: string) => {
    const { title, description, type, status } = payload;

    const insertIssuesIntoDB = await dbQuery(`
    INSERT INTO issues(title, description, type, status, reporter_id) VALUES( $1, $2, $3, COALESCE($4, 'open'), $5) RETURNING *
    `, [title, description, type, status, reporter_id]);

    return insertIssuesIntoDB.rows[0];
};

// get single issue from DB
const getSingleIssueFromDB = async (id: string) => {
    const singleIssue = await dbQuery(`SELECT * FROM issues WHERE id = $1`, [id]);
    if (singleIssue.rows.length === 0) {
        throw new AppError("Not found! No issue exists with this id", 404)
    }

    const issue = singleIssue.rows[0];


    const getReporter = await dbQuery(`SELECT * FROM users WHERE id = $1`, [issue.reporter_id]);

    const reporter = getReporter.rows[0];

    return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: {
            id: reporter.id,
            name: reporter.name,
            role: reporter.role
        },
        created_at: issue.created_at,
        updated_at: issue.updated_at
    }

};


// update an issue into DB
const updateIssueIntoDB = async (id: string, payload: UPDATE_ISSUES, user_id: string, user_role: string) => {
    const issueExists = await dbQuery(`SELECT * FROM issues WHERE id = $1`, [id]);

    if (issueExists.rows.length === 0) {
        throw new AppError("Not found! No issues exists with this id", 404);
    }

    const issue = issueExists.rows[0];

    const { title, description, type, status } = payload;

    // check permission for contributor
    if (user_role === "contributor") {
        //check reporter id match the user id
        if (issue.reporter_id !== user_id) {
            throw new AppError("Forbidden! You can only update your own issues", 403);
        }
        //status can be edited by only maintainer
        if (status) {
            console.log("status");
            throw new AppError("Forbidden! Only maintainer can update status", 403);
        }
        //contributor can update open status only
        if (issue.status !== "open") {
            throw new AppError("Forbidden! You can only update issues with open status", 403);
        }
    };

    const updatedIssue = await dbQuery(`UPDATE issues SET title = COALESCE($1, title), description = COALESCE($2, description), type = COALESCE($3, type), status = COALESCE($4, status), updated_at = NOW() WHERE id = $5 RETURNING *`, [title, description, type, status, id]);
    return updatedIssue.rows[0];

};

// delete an issue from DB
const deleteIssueFromDB = async (id: string) => {
    const issueExists = await dbQuery(`SELECT * FROM issues WHERE id = $1`, [id]);

    if (issueExists.rows.length === 0) {
        throw new AppError("Not found! No issues exists with this id", 404);
    }

    await dbQuery(`DELETE FROM issues WHERE id = $1`, [id]);

};

const getAllIssuesFromDB = async () => {
    console.log("all issues");
}

export const issuesService = {
    createIssuesIntoDB,
    getSingleIssueFromDB,
    updateIssueIntoDB,
    deleteIssueFromDB,
    getAllIssuesFromDB
}