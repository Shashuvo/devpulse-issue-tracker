import { AUTH_USER } from './../../types/index';

import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";

const router = Router();

// create issues
router.post("/", auth(AUTH_USER.contributor, AUTH_USER.maintainer), issuesController.createIssues);

export const issuesRoute = router;