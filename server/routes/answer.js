import express from "express";

import {
  postanswer,
  deleteanswer,
} from "../controller/answer.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/post/:id",
  auth,
  postanswer
);

router.delete(
  "/delete/:questionid/:answerid",
  auth,
  deleteanswer
);

export default router;