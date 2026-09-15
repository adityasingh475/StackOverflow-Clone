import mongoose from "mongoose";
import question from "../models/question.js";

// POST ANSWER
export const postanswer = async (req, res) => {
  const { id: _id } = req.params;

  const { answerbody } = req.body;

  const userid = req.userid;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "Question unavailable",
    });
  }

  try {
    const questiondata = await question.findById(_id);

    if (!questiondata) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    questiondata.answer.push({
      answerbody,
      useranswered: req.body.useranswered,
      userid,
    });

    questiondata.noofanswer =
      questiondata.answer.length;

    await questiondata.save();

    res.status(200).json({
      data: questiondata,
    });
  } catch (error) {
    console.log("ANSWER POST ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// DELETE ANSWER
export const deleteanswer = async (req, res) => {
  const {
    questionid,
    answerid,
  } = req.params;

  console.log(
    "QUESTION ID:",
    questionid
  );

  console.log(
    "ANSWER ID:",
    answerid
  );

  console.log(
    "USER ID:",
    req.userid
  );

  if (
    !mongoose.Types.ObjectId.isValid(
      questionid
    )
  ) {
    return res.status(400).json({
      message: "Question unavailable",
    });
  }

  try {
    const questiondata =
      await question.findById(questionid);

    if (!questiondata) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const answer =
      questiondata.answer.find(
        (item) =>
          String(item._id) ===
          String(answerid)
      );

    if (!answer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    if (
      String(answer.userid) !==
      String(req.userid)
    ) {
      return res.status(403).json({
        message:
          "You can delete only your answer",
      });
    }

    questiondata.answer =
      questiondata.answer.filter(
        (item) =>
          String(item._id) !==
          String(answerid)
      );

    questiondata.noofanswer =
      questiondata.answer.length;

    await questiondata.save();

    res.status(200).json({
      data: questiondata,
    });
  } catch (error) {
    console.log(
      "DELETE ANSWER ERROR:",
      error
    );

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};