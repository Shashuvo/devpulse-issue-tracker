
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

}

export const issuesService = {
    createIssuesIntoDB,
    getSingleIssueFromDB,
}