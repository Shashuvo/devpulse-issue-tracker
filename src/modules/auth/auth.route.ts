import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// users registration
router.post("/signup", authController.createUser);

// users login
router.get("/login", authController.loginUser);


export const authRoute = router;