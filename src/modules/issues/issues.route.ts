import { AUTH_USER } from './../../types/index';

import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

// create issues
router.post("/", auth(AUTH_USER.contributor, AUTH_USER.maintainer), issuesController.createIssues);

// get single issue
router.get("/:id", issuesController.getSingleIssue);

// update issue
router.put("/:id", auth(AUTH_USER.contributor, AUTH_USER.maintainer), issuesController.updateIssue);

export const issuesRoute = router;