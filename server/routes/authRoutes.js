import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js";
const router=express.Router();

// routes
// REGISTER
router.post('/register',registerController)

// LOGIN
router.post('/login',loginController)


export default router;