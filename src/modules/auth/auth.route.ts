import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// users registration
router.post("/signup", authController.createUser);


export const authRoute = router;