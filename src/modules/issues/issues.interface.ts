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
}