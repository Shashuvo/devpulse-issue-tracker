import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router();


// create issues
router.post("/", issuesController.createIssues);

export const issuesRoute = router;