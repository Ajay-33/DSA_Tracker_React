import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
import {
  addQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
} from "../controllers/questionControllers.js";

const router = express.Router();

router.post("/add/:cid", userAuth, addQuestion);

router.get("/show", userAuth, getAllQuestions);

router.get("/show/:id", userAuth, getQuestionById);

router.patch("/update/:id", userAuth, updateQuestion);

router.delete("/delete/:id/:cid", userAuth, deleteQuestion);

export default router;
