import mongoose from "mongoose";
import user from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await user.findOne({ email });

    if (existinguser) {
      return res.status(404).json({
        message: "User already exists",
      });
    }

    const token = jwt.sign(
      {
        email: email,
        id: existinguser?._id,
      },
      process.env.JWT_SECRET
    );

    const hashpassword = await bcrypt.hash(
      password,
      12
    );

    const newuser = await user.create({
      name,
      email,
      password: hashpassword,
    });

    const newtoken = jwt.sign(
      {
        email: newuser.email,
        id: newuser._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      data: {
        ...newuser._doc,
        token: newtoken,
      },
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// LOGIN
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await user.findOne({
      email,
    });

    if (!existinguser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const ispasswordcorrect =
      await bcrypt.compare(
        password,
        existinguser.password
      );

    if (!ispasswordcorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        email: existinguser.email,
        id: existinguser._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      data: {
        ...existinguser._doc,
        token,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// GET ALL USERS
export const getallusers = async (req, res) => {
  try {
    const allusers = await user.find();

    res.status(200).json({
      data: allusers,
    });
  } catch (error) {
    console.log("GET USERS ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// UPDATE PROFILE
export const updateprofile = async (req, res) => {
  const { id: _id } = req.params;

  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "User unavailable",
    });
  }

  try {
    const updateduser = await user.findByIdAndUpdate(
      _id,
      {
        name,
        about,
        tags,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      data: updateduser,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};