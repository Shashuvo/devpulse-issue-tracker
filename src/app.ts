import express, { urlencoded, type Request, type Response } from "express";
import sendResponse from "./utility/sendResponse";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import { issuesRoute } from "./modules/issues/issues.route";
import globalErrorHandler from "./utility/globalErrorHandler";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: true }));
app.use(logger);

app.get("/", async (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "This is root route of Dev Pulse"
    })
});

// users registration and login
app.use("/api/auth", authRoute);

// issue CRUD
app.use("/api/issues", issuesRoute);

// global error handler
app.use(globalErrorHandler);

export default app;