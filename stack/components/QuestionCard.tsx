import React from "react";
import Link from "next/link";

type QuestionCardProps = {
  id: string;
  votes: number;
  answers: number;
  views: number;
  title: string;
  description: string;
  tags: string[];
  user: string;
  time: string;
};

const QuestionCard = ({
  id,
  votes,
  answers,
  views,
  title,
  description,
  tags,
  user,
  time,
}: QuestionCardProps) => {
  return (
    <div className="question-card">

      <div className="question-stats">
        <span>{votes} votes</span>
        <span>{answers} answers</span>
        <span>{views} views</span>
      </div>

      <div className="question-summary">

        <Link
          href={`/questions/${id}`}
          className="question-title"
        >
          {title}
        </Link>

        <p className="question-description">
          {description}
        </p>

        <div className="question-tags">

          {tags?.map(
            (tag, index) => (
              <span
                key={index}
                className="question-tag"
              >
                {tag}
              </span>
            )
          )}

        </div>

        <div className="question-user">
          <span>{user}</span>
          <span>{time}</span>
        </div>

      </div>

    </div>
  );
};

export default QuestionCard;