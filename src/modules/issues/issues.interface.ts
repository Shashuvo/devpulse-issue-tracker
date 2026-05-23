export interface ISSUES {
    title: string;
    description: string;
    type: string;
    status?: string;
};

export interface UPDATE_ISSUES {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
};

export type SortOrder = "newest" | "oldest";
export type IssueType = "bug" | "feature_request";
export type IssueStatus = 'open' | 'in_progress' | 'resolved';

export interface ISSUE_QUERY {
    sort?: SortOrder;
    type?: IssueType;
    status?: IssueStatus;
}