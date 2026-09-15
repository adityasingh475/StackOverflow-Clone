import express from "express";

import {
  Askquestion,
  deletequestion,
  getallquestion,
  getquestiondetails,
  votequestion,
} from "../controller/question.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", Askquestion);

router.get("/getallquestion", getallquestion);

router.get("/:id", getquestiondetails);

router.delete(
  "/delete/:id",
  auth,
  deletequestion
);

router.patch("/vote/:id", votequestion);

export default router;