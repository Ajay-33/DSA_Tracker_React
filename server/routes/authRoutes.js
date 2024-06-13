import express from "express";
import { addPredefinedEmailsController, loginController, registerController, removePredefinedEmailsController } from "../controllers/authControllers.js";
const router=express.Router();

// routes
// REGISTER
router.post('/register',registerController)

// LOGIN
router.post('/login',loginController)

// Admin Emails
router.post('/adminEmails/add',addPredefinedEmailsController);
router.delete('/adminEmails/delete',removePredefinedEmailsController);
export default router;