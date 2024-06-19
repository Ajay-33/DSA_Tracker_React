import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
import {
  DeleteCategory,
  UpdateCategory,
  addCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/add", userAuth, addCategory);

router.get("/show", userAuth, getCategories);

router.get("/show/:id", userAuth, getCategory);

router.patch("/update/:id", userAuth, UpdateCategory);

router.delete("/delete/:id", userAuth, DeleteCategory);

export default router;
