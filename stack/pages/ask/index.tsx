import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import axiosInstance from "@/lib/axiosinstance";
import { useAuth } from "@/lib/AuthContext";

import MainLayout from "../../src/layout/Mainlayout";

const index = () => {
  const router = useRouter();

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();

    if (!tag) {
      return;
    }

    if (formData.tags.length >= 5) {
      toast.error("You can add maximum 5 tags");
      return;
    }

    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));

    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (tag) => tag !== tagToRemove
      ),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to ask question");

      router.push("/auth");

      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter question title");

      return;
    }

    if (formData.body.trim().length < 20) {
      toast.error(
        "Question details must be at least 20 characters"
      );

      return;
    }

    if (formData.tags.length === 0) {
      toast.error(
        "Please add at least one tag"
      );

      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "/question/ask",
        {
          postquestiondata: {
            questiontitle:
              formData.title.trim(),

            questionbody:
              formData.body.trim(),

            questiontags:
              formData.tags,

            userposted:
              user.name,

            userid:
              user._id,
          },
        }
      );

      console.log(
        "POST RESPONSE:",
        res.data
      );

      toast.success(
        "Question posted successfully"
      );

      setFormData({
        title: "",
        body: "",
        tags: [],
      });

      setTagInput("");

      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (error) {
      console.error(
        "POST ERROR:",
        error
      );

      toast.error(
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="w-full px-[22px] py-[28px]">

        <h1 className="text-[28px] font-bold text-[#232629] mb-[25px]">
          Ask a public question
        </h1>

        <div className="border border-[#d6d9dc] rounded-[8px] bg-white p-[24px]">

          <h2 className="text-[22px] font-bold text-[#232629] mb-[30px]">
            Writing a good question
          </h2>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}

            <div className="mb-[28px]">

              <h3 className="text-[16px] font-bold text-[#232629] mb-[5px]">
                Title
              </h3>

              <p className="text-[13px] text-[#3b4045] mb-[10px]">
                Be specific and imagine you’re asking a question to another person.
              </p>

              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. How to center a div in CSS?"
                className="
                  w-full
                  h-[38px]
                  border
                  border-[#b9bfc3]
                  rounded-[6px]
                  px-[10px]
                  text-[14px]
                  outline-none
                  focus:border-[#0074cc]
                "
              />

            </div>

            {/* BODY */}

            <div className="mb-[28px]">

              <h3 className="text-[16px] font-bold text-[#232629] mb-[5px]">
                What are the details of your problem?
              </h3>

              <p className="text-[13px] text-[#3b4045] mb-[10px]">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>

              <textarea
                id="body"
                value={formData.body}
                onChange={handleChange}
                placeholder="Describe your problem in detail..."
                className="
                  w-full
                  h-[185px]
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

            </div>

            {/* TAGS */}

            <div className="mb-[25px]">

              <h3 className="text-[16px] font-bold text-[#232629] mb-[5px]">
                Tags
              </h3>

              <p className="text-[13px] text-[#3b4045] mb-[10px]">
                Add up to 5 tags to describe what your question is about.
              </p>

              <div className="flex gap-[8px]">

                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) =>
                    setTagInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      handleAddTag();
                    }
                  }}
                  placeholder="e.g. javascript react nextjs"
                  className="
                    flex-1
                    h-[38px]
                    border
                    border-[#b9bfc3]
                    rounded-[6px]
                    px-[10px]
                    text-[14px]
                    outline-none
                    focus:border-[#0074cc]
                  "
                />

                <button
                  type="button"
                  onClick={handleAddTag}
                  className="
                    w-[38px]
                    h-[38px]
                    border-0
                    rounded-[6px]
                    bg-[#f48024]
                    text-white
                    text-[22px]
                    cursor-pointer
                  "
                >
                  +
                </button>

              </div>

              {/* TAG LIST */}

              {formData.tags.length > 0 && (

                <div className="flex flex-wrap gap-[8px] mt-[10px]">

                  {formData.tags.map(
                    (tag) => (

                      <span
                        key={tag}
                        className="
                          bg-[#fff3e0]
                          text-[#9a6700]
                          rounded-[4px]
                          px-[8px]
                          py-[5px]
                          text-[12px]
                        "
                      >

                        {tag}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveTag(tag)
                          }
                          className="
                            ml-[7px]
                            border-0
                            bg-transparent
                            text-[#9a6700]
                            cursor-pointer
                            p-0
                          "
                        >
                          ×
                        </button>

                      </span>

                    )
                  )}

                </div>

              )}

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="
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
                : "Review your question"}
            </button>

          </form>

        </div>

      </div>

    </MainLayout>
  );
};

export default index;