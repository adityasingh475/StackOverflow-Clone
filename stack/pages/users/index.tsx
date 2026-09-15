import MainLayout from "../../src/layout/Mainlayout";
import { Filter } from "lucide-react";
import QuestionCard from "../../components/QuestionCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";

export default function Home() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosInstance.get(
          "/question/getallquestion"
        );

        console.log(
          "GET QUESTIONS:",
          res.data
        );

        setQuestions(res.data.data);
      } catch (error) {
        console.error(
          "GET QUESTIONS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <MainLayout>
      <div className="home-page">

        <div className="home-header">

          <h1 className="home-title">
            Top Questions
          </h1>

          <Link
            href="/ask"
            className="ask-button"
          >
            Ask Question
          </Link>

        </div>

        <div className="question-toolbar">

          <span className="question-count">
            {questions.length} questions
          </span>

          <div className="filter-buttons">

            <button className="filter-button active">
              Newest
            </button>

            <button className="filter-button">
              Active
            </button>

            <button className="filter-button">
              Bountied
              <span className="bounty-count">
                25
              </span>
            </button>

            <button className="filter-button">
              Unanswered
            </button>

            <button className="filter-button">
              More ▼
            </button>

            <button className="filter-button filter-button-last">
              <Filter size={13} />
              Filter
            </button>

          </div>

        </div>

        <div className="questions-list">

          {loading ? (
            <div>
              Loading questions...
            </div>
          ) : questions.length === 0 ? (
            <div>
              No questions found
            </div>
          ) : (
            questions.map(
              (question: any) => (
                <QuestionCard
                  key={question._id}
                  id={question._id}
                  votes={
                    question.upvote?.length || 0
                  }
                  answers={
                    question.noofanswer || 0
                  }
                  views={0}
                  title={
                    question.questiontitle
                  }
                  description={
                    question.questionbody
                  }
                  tags={
                    question.questiontags
                  }
                  user={
                    question.userposted
                  }
                  time={
                    question.askedon
                      ? new Date(
                          question.askedon
                        ).toLocaleString()
                      : ""
                  }
                />
              )
            )
          )}

        </div>

      </div>
    </MainLayout>
  );
}