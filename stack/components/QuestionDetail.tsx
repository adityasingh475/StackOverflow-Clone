import React from "react";
import {
  Share2,
  Flag,
  Trash2,
} from "lucide-react";

const QuestionDetail = ({
  question,
  onVote,
  onDelete,
}: any) => {
  if (!question) {
    return null;
  }

  return (
    <div className="flex mt-[25px]">

      <div className="w-[70px] flex flex-col items-center gap-[12px]">

        <button
          onClick={() => onVote("upvote")}
          className="text-[22px] cursor-pointer"
        >
          ▲
        </button>

        <span className="text-[16px] font-bold">
          {question.upvote?.length || 0}
        </span>

        <button
          onClick={() => onVote("downvote")}
          className="text-[22px] cursor-pointer"
        >
          ▼
        </button>

        <button className="text-[18px] mt-[10px]">
          ♡
        </button>

      </div>

      <div className="flex-1">

        <div className="text-[15px] leading-[24px] text-[#232629] whitespace-pre-wrap">
          {question.questionbody}
        </div>

        <div className="flex flex-wrap gap-[7px] mt-[25px]">

          {question.questiontags?.map(
            (tag: string, index: number) => (
              <span
                key={index}
                className="
                  bg-[#eff0f1]
                  text-[#3b4045]
                  px-[7px]
                  py-[5px]
                  rounded-[4px]
                  text-[12px]
                "
              >
                {tag}
              </span>
            )
          )}

        </div>

        <div className="flex justify-between items-end mt-[25px]">

          <div className="flex gap-[15px] text-[12px] text-[#6a737c]">

            <button className="flex items-center gap-[4px] hover:text-[#232629] cursor-pointer">
              <Share2 size={14} />
              Share
            </button>

            <button className="flex items-center gap-[4px] hover:text-[#232629] cursor-pointer">
              <Flag size={14} />
              Flag
            </button>

            <button
              onClick={onDelete}
              className="flex items-center gap-[4px] hover:text-red-500 cursor-pointer"
            >
              <Trash2 size={14} />
              Delete
            </button>

          </div>

          <div className="bg-[#f8f9f9] p-[12px] rounded-[5px]">

            <div className="text-[12px] text-[#6a737c]">
              asked by
            </div>

            <div className="text-[13px] text-[#39739d] font-bold">
              {question.userposted}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default QuestionDetail;