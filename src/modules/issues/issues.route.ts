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

// delete a issue
router.delete("/:id", auth(AUTH_USER.maintainer), issuesController.deleteIssue);

// get all issues
router.get("/", issuesController.getAllIssues);

export const issuesRoute = router;