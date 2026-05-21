import express, { urlencoded, type Request, type Response } from "express";
const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: true }));

app.get("/", async(req:Request, res: Response)=>{
    res.status(200).json({
        success: true,
        message: "This is root route of Dev Pulse"
    })
})

export default app;