
import AppError from "../../utility/appError";
import dbQuery from "../../utility/dbQuery";

// create issues in DB
const createIssuesIntoDB = async (payload: any, reporter_id: string) => {
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
        throw new AppError("Not found! No user with this id", 404)
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

}

export const issuesService = {
    createIssuesIntoDB,
    getSingleIssueFromDB,
}