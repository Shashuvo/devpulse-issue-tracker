export interface CatchError {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: string | undefined;
}