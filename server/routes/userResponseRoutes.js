import express from "express";
import userAuth from "../middlewares/authmiddleware.js"
import { getAllData, getUserResponses } from "../controllers/userDataControllers.js";


const router=express.Router();

router.get('/get-all-data',userAuth,getAllData)

router.get('/get-user-responses',userAuth,getUserResponses)

export default router;
