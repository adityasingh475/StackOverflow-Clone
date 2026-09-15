import mongoose from "mongoose";
import question from "../models/question.js";

// ASK QUESTION
export const Askquestion = async (req, res) => {
  const { postquestiondata } = req.body;

  try {
    if (!postquestiondata) {
      return res.status(400).json({
        message: "Question data is required",
      });
    }

    const postques = new question({
      questiontitle: postquestiondata.questiontitle,
      questionbody: postquestiondata.questionbody,
      questiontags: postquestiondata.questiontags,
      userposted: postquestiondata.userposted,
      userid: postquestiondata.userid,
    });

    await postques.save();

    res.status(200).json({
      data: postques,
    });
  } catch (error) {
    console.log("QUESTION POST ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// GET ALL QUESTIONS
export const getallquestion = async (req, res) => {
  try {
    const allquestion = await question
      .find()
      .sort({ askedon: -1 });

    res.status(200).json({
      data: allquestion,
    });
  } catch (error) {
    console.log("QUESTION GET ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// GET SINGLE QUESTION
export const getquestiondetails = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "question unavailable",
    });
  }

  try {
    const questiondetails = await question.findById(_id);

    if (!questiondetails) {
      return res.status(404).json({
        message: "question not found",
      });
    }

    res.status(200).json({
      data: questiondetails,
    });
  } catch (error) {
    console.log("QUESTION DETAIL ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// DELETE QUESTION
export const deletequestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "question unavailable",
    });
  }

  try {
    const questiondata = await question.findById(_id);

    if (!questiondata) {
      return res.status(404).json({
        message: "question not found",
      });
    }

    console.log(
      "QUESTION USER ID:",
      questiondata.userid
    );

    console.log(
      "LOGIN USER ID:",
      req.userid
    );

    if (
      String(questiondata.userid) !==
      String(req.userid)
    ) {
      return res.status(403).json({
        message: "You can delete only your question",
      });
    }

    await question.findByIdAndDelete(_id);

    res.status(200).json({
      message: "question deleted",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// VOTE QUESTION
export const votequestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userid } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "question unavailable",
    });
  }

  try {
    const questiondata = await question.findById(_id);

    if (!questiondata) {
      return res.status(404).json({
        message: "question not found",
      });
    }

    const upindex = questiondata.upvote.findIndex(
      (id) => id === String(userid)
    );

    const downindex = questiondata.downvote.findIndex(
      (id) => id === String(userid)
    );

    if (value === "upvote") {
      if (downindex !== -1) {
        questiondata.downvote =
          questiondata.downvote.filter(
            (id) => id !== String(userid)
          );
      }

      if (upindex === -1) {
        questiondata.upvote.push(userid);
      } else {
        questiondata.upvote =
          questiondata.upvote.filter(
            (id) => id !== String(userid)
          );
      }
    } else if (value === "downvote") {
      if (upindex !== -1) {
        questiondata.upvote =
          questiondata.upvote.filter(
            (id) => id !== String(userid)
          );
      }

      if (downindex === -1) {
        questiondata.downvote.push(userid);
      } else {
        questiondata.downvote =
          questiondata.downvote.filter(
            (id) => id !== String(userid)
          );
      }
    }

    const questionvote =
      await question.findByIdAndUpdate(
        _id,
        questiondata,
        { new: true }
      );

    res.status(200).json({
      data: questionvote,
    });
  } catch (error) {
    console.log("VOTE ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};

// OLD ANSWER FUNCTION
export const Answerquestion = async (req, res) => {
  const { id: _id } = req.params;

  const {
    answerbody,
    useranswered,
    userid,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      message: "question unavailable",
    });
  }

  try {
    const questiondata = await question.findById(_id);

    if (!questiondata) {
      return res.status(404).json({
        message: "question not found",
      });
    }

    const newanswer = {
      answerbody,
      useranswered,
      userid,
      answeredon: new Date(),
    };

    questiondata.answer.push(newanswer);

    questiondata.noofanswer =
      questiondata.answer.length;

    const updatedquestion =
      await questiondata.save();

    res.status(200).json({
      data: updatedquestion,
    });
  } catch (error) {
    console.log("ANSWER ERROR:", error);

    res.status(500).json({
      message: "something went wrong..",
    });
  }
};