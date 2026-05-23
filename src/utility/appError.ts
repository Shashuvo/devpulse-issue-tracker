
class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 500,
        public errors: string = message
    ) {
        super(message);
    }
}

export default AppError;