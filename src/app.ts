import express, { urlencoded, type Request, type Response } from "express";
import sendResponse from "./utility/sendResponse";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "This is root route of Dev Pulse"
    })
})

export default app;