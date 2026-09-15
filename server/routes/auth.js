import express from "express";

import {
  Login,
  Signup,
  getallusers,
  updateprofile,
} from "../controller/auth.js";

const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);

router.get("/getallusers", getallusers);

router.put("/updateprofile/:id", updateprofile);

export default router;