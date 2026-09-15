import React, { useState } from "react";
import {
  Share2,
  Flag,
  Trash2,
} from "lucide-react";

const AnswerSection = ({
  answers,
  onAnswer,
  onDeleteAnswer,
  loading,
  user,
}: any) => {
  const [answerbody, setAnswerbody] =
    useState("");

  const handleSubmit = async () => {
    if (!answerbody.trim()) {
      return;
    }

    await onAnswer(answerbody);

    setAnswerbody("");
  };

  return (
    <div className="mt-[40px] border-t border-[#e1e4e6] pt-[25px]">

      <h2 className="text-[20px] font-bold text-[#232629] mb-[20px]">
        {answers?.length || 0} Answers
      </h2>

      {!answers || answers.length === 0 ? (
        <div className="text-[14px] text-[#6a737c] mb-[25px]">
          No answers yet.
        </div>
      ) : (
        answers.map(
          (answer: any, index: number) => (
            <div
              key={answer._id || index}
              className="
                border-b
                border-[#e1e4e6]
                py-[20px]
              "
            >

              <div className="text-[15px] leading-[24px] whitespace-pre-wrap">
                {answer.answerbody}
              </div>

              <div className="flex justify-between items-center mt-[12px]">

                <div className="text-[12px] text-[#6a737c]">
                  answered by{" "}
                  {answer.useranswered}
                </div>

                <div className="flex items-center gap-[15px] text-[12px] text-[#6a737c]">

                  <button className="flex items-center gap-[4px] hover:text-[#232629] cursor-pointer">
                    <Share2 size={14} />
                    Share
                  </button>

                  <button className="flex items-center gap-[4px] hover:text-[#232629] cursor-pointer">
                    <Flag size={14} />
                    Flag
                  </button>

                  {user &&
                    String(answer.userid) ===
                      String(user._id) && (
                      <button
                        onClick={() =>
                          onDeleteAnswer(
                            answer._id
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-[4px]
                          hover:text-red-500
                          cursor-pointer
                        "
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    )}

                </div>

              </div>

            </div>
          )
        )
      )}

      <div className="mt-[25px]">

        <h3 className="text-[16px] font-bold text-[#232629] mb-[10px]">
          Your Answer
        </h3>

        <textarea
          value={answerbody}
          onChange={(e) =>
            setAnswerbody(e.target.value)
          }
          placeholder="Write your answer here..."
          className="
            w-full
            h-[150px]
            resize-none
            border
            border-[#b9bfc3]
            rounded-[6px]
            px-[10px]
            py-[10px]
            text-[14px]
            outline-none
            focus:border-[#0074cc]
          "
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            mt-[10px]
            bg-[#0a95ff]
            text-white
            rounded-[6px]
            px-[16px]
            py-[10px]
            text-[14px]
            cursor-pointer
            hover:bg-[#0074cc]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Posting..."
            : "Post Your Answer"}
        </button>

      </div>

    </div>
  );
};

export default AnswerSection;