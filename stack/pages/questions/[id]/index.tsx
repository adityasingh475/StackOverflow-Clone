import React, {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/router";

import MainLayout from "../../../src/layout/Mainlayout";

import QuestionDetail from "../../../components/QuestionDetail";
import AnswerSection from "../../../components/AnswerSection";

import axiosInstance from "@/lib/axiosinstance";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-toastify";

const Index = () => {
  const router = useRouter();

  const { id } = router.query;

  const { user } = useAuth();

  const [question, setQuestion] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [answerLoading, setAnswerLoading] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const questionId = Array.isArray(id)
      ? id[0]
      : id;

    if (!questionId) {
      setLoading(false);
      setError("Question ID not found");
      return;
    }

    const fetchQuestion = async () => {
      try {
        const res =
          await axiosInstance.get(
            `/question/${questionId}`
          );

        setQuestion(res.data.data);

        setError("");
      } catch (error: any) {
        console.error(
          "QUESTION DETAIL ERROR:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Question not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [router.isReady, id]);

  const handleVote = async (
    value: string
  ) => {
    const questionId = Array.isArray(id)
      ? id[0]
      : id;

    if (!user) {
      toast.error(
        "Please login to vote"
      );

      return;
    }

    try {
      const res =
        await axiosInstance.patch(
          `/question/vote/${questionId}`,
          {
            value,
            userid: user._id,
          }
        );

      setQuestion(res.data.data);
    } catch (error) {
      console.error(
        "VOTE ERROR:",
        error
      );

      toast.error(
        "Something went wrong"
      );
    }
  };

  const handleAnswer = async (
    answerbody: string
  ) => {
    const questionId = Array.isArray(id)
      ? id[0]
      : id;

    if (!user) {
      toast.error(
        "Please login to answer"
      );

      return;
    }

    setAnswerLoading(true);

    try {
      const res =
        await axiosInstance.post(
          `/answer/post/${questionId}`,
          {
            answerbody,
            useranswered: user.name,
          }
        );

      setQuestion(res.data.data);

      toast.success(
        "Answer posted successfully"
      );
    } catch (error: any) {
      console.error(
        "ANSWER ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setAnswerLoading(false);
    }
  };

  const handleDelete = async () => {
    const questionId = Array.isArray(id)
      ? id[0]
      : id;

    if (!user) {
      toast.error(
        "Please login to delete"
      );

      return;
    }

    try {
      await axiosInstance.delete(
        `/question/delete/${questionId}`
      );

      toast.success(
        "Question deleted successfully"
      );

      router.push("/");
    } catch (error: any) {
      console.error(
        "DELETE ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDeleteAnswer = async (
    answerid: string
  ) => {
    const questionId = Array.isArray(id)
      ? id[0]
      : id;

    if (!user) {
      toast.error(
        "Please login to delete"
      );

      return;
    }

    try {
      const res =
        await axiosInstance.delete(
          `/answer/delete/${questionId}/${answerid}`
        );

      setQuestion(res.data.data);

      toast.success(
        "Answer deleted successfully"
      );
    } catch (error: any) {
      console.error(
        "DELETE ANSWER ERROR:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-[25px]">
          Loading question...
        </div>
      </MainLayout>
    );
  }

  if (error || !question) {
    return (
      <MainLayout>
        <div className="p-[25px] text-red-500">
          {error ||
            "Question not found"}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full px-[22px] py-[25px]">

        <div className="border-b border-[#e1e4e6] pb-[20px]">

          <h1 className="text-[28px] font-bold text-[#232629] mb-[12px]">
            {question.questiontitle}
          </h1>

          <div className="text-[13px] text-[#6a737c]">
            Asked{" "}
            {question.askedon
              ? new Date(
                  question.askedon
                ).toLocaleString()
              : ""}
          </div>

        </div>

        <QuestionDetail
          question={question}
          onVote={handleVote}
          onDelete={handleDelete}
        />

        <AnswerSection
          answers={question.answer}
          onAnswer={handleAnswer}
          onDeleteAnswer={
            handleDeleteAnswer
          }
          loading={answerLoading}
          user={user}
        />

      </div>
    </MainLayout>
  );
};

export default Index;