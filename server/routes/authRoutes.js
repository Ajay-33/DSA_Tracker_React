import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
import {
  addPredefinedEmailsController,
  deleteUser,
  editRole,
  getUsers,
  loginController,
  registerController,
  removePredefinedEmailsController,
} from "../controllers/authControllers.js";
const router = express.Router();

// routes
// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// Get Users
router.get("/users", userAuth, getUsers);

// Delete User
router.delete("/users/delete/:id", userAuth, deleteUser);

// Edit Role
router.patch("/users/update/:id", userAuth, editRole);

// Admin Emails
router.post("/adminEmails/add", userAuth, addPredefinedEmailsController);
router.delete(
  "/adminEmails/delete",
  userAuth,
  removePredefinedEmailsController
);

export default router;
