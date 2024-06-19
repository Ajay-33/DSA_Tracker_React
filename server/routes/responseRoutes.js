import express from "express";
import userAuth from "../middlewares/authmiddleware.js";
import {
  showNotes,
  showStatus,
  showStatusQuery,
  updateNotes,
  updateStatus,
} from "../controllers/responseControllers.js";

const router = express.Router();

router.post("/status/add/:qid", userAuth, updateStatus);
router.get("/status/show/:qid", userAuth, showStatus);
router.get("/status/show", userAuth, showStatusQuery);

router.post("/notes/add/:qid", userAuth, updateNotes);
router.get("/notes/show/:qid", userAuth, showNotes);

// router.get('/bookmark/add/:qid',userAuth,updateBookMark)
// router.get('/bookmarks/show',userAuth,getAllBookMarks)

export default router;
