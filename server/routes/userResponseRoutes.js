import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
import {
  getAllData,
  getUserResponses,
  CategoriesData,
  catResponses,
} from "../controllers/userDataControllers.js";

const router = express.Router();

router.get("/get-all-data", userAuth, getAllData);

router.get("/get-user-responses", userAuth, getUserResponses);

router.get("/get-categories-data/:id", userAuth, CategoriesData);

router.get("/get-category-responses/:id", userAuth, catResponses);

export default router;
