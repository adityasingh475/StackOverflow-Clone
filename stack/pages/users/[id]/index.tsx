import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import MainLayout from "../../../src/layout/Mainlayout";
import axiosInstance from "@/lib/axiosinstance";

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editAbout, setEditAbout] = useState("");

  const [editTags, setEditTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/user/getallusers");

        const foundUser = res.data.data.find(
          (user: any) => user._id === id
        );

        setUser(foundUser);

        setEditName(foundUser?.name || "");
        setEditAbout(foundUser?.about || "");
        setEditTags(foundUser?.tags || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) {
      return;
    }

    if (editTags.includes(trimmedTag)) {
      setNewTag("");
      return;
    }

    setEditTags([...editTags, trimmedTag]);
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditTags(editTags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(
        `/user/updateprofile/${user._id}`,
        {
          name: editName,
          about: editAbout,
          tags: editTags,
        }
      );

      setUser(res.data.data);

      setEditName(res.data.data.name || "");
      setEditAbout(res.data.data.about || "");
      setEditTags(res.data.data.tags || []);

      setIsEditing(false);

      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <MainLayout>
      <div className="w-full px-[22px] py-[28px]">

        {/* PROFILE HEADER */}

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-[28px]">

            {/* AVATAR */}

            <div
              className="
                w-[128px]
                h-[128px]
                shrink-0
                rounded-full
                bg-[#f1f2f3]
                flex
                items-center
                justify-center
                text-[30px]
                text-[#232629]
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* USER INFO */}

            <div>

              <h1 className="m-0 text-[30px] leading-[38px] font-bold text-[#232629]">
                {user.name}
              </h1>

              <div className="flex items-center gap-[8px] mt-[14px]">

                <span className="text-[17px] text-[#6a737c]">
                  ▣
                </span>

                <span className="text-[14px] text-[#525960]">
                  Member since{" "}
                  {user.joinDate
                    ? new Date(user.joinDate)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </span>

              </div>

              {/* BADGES */}

              <div className="flex items-center gap-[24px] mt-[20px]">

                <div className="flex items-center gap-[7px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#f1b900]" />

                  <span className="text-[14px] text-[#3b4045]">
                    <strong>5</strong> gold badges
                  </span>
                </div>

                <div className="flex items-center gap-[7px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#b8bec4]" />

                  <span className="text-[14px] text-[#3b4045]">
                    <strong>23</strong> silver badges
                  </span>
                </div>

                <div className="flex items-center gap-[7px]">
                  <span className="w-[12px] h-[12px] rounded-full bg-[#d77b00]" />

                  <span className="text-[14px] text-[#3b4045]">
                    <strong>45</strong> bronze badges
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* EDIT PROFILE BUTTON */}

          <button
            type="button"
            onClick={() => {
              setEditName(user.name || "");
              setEditAbout(user.about || "");
              setEditTags(user.tags || []);
              setIsEditing(true);
            }}
            className="
              border
              border-[#d6d9dc]
              bg-white
              rounded-[6px]
              px-[14px]
              py-[9px]
              text-[13px]
              text-[#3b4045]
              cursor-pointer
              hover:bg-[#f1f2f3]
            "
          >
            ✎ Edit Profile
          </button>

        </div>

        {/* ABOUT */}

        <div
          className="
            w-full
            border
            border-[#d6d9dc]
            rounded-[8px]
            bg-white
            mt-[32px]
            px-[24px]
            py-[22px]
          "
        >

          <h2 className="m-0 mb-[28px] text-[17px] font-bold text-[#232629]">
            About
          </h2>

          <p className="m-0 text-[15px] leading-[25px] text-[#232629]">
            {user.about || ""}
          </p>

        </div>

        {/* TOP TAGS */}

        <div
          className="
            w-full
            border
            border-[#d6d9dc]
            rounded-[8px]
            bg-white
            mt-[24px]
            px-[24px]
            py-[22px]
            min-h-[300px]
          "
        >

          <h2 className="m-0 mb-[28px] text-[17px] font-bold text-[#232629]">
            Top Tags
          </h2>

          <div className="flex flex-wrap items-start gap-[12px]">

            {editTags.map((tag) => (
              <span
                key={tag}
                className="
                  bg-[#e1ecf4]
                  text-[#39739d]
                  rounded-[4px]
                  px-[8px]
                  py-[5px]
                  text-[12px]
                  leading-[14px]
                "
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}

      {isEditing && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/50
            flex
            items-center
            justify-center
            p-[20px]
          "
        >

          <div className="bg-white rounded-[8px] w-[510px] max-w-full">

            {/* MODAL HEADER */}

            <div className="px-[24px] py-[20px] border-b border-[#e1e4e6]">

              <div className="flex items-center justify-between">

                <h2 className="m-0 text-[20px] font-bold text-[#232629]">
                  Edit Profile
                </h2>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="
                    border-0
                    bg-transparent
                    text-[22px]
                    text-[#6a737c]
                    cursor-pointer
                  "
                >
                  ×
                </button>

              </div>

            </div>

            {/* MODAL BODY */}

            <div className="px-[24px] py-[20px]">

              <h3 className="m-0 mb-[16px] text-[17px] font-bold text-[#232629]">
                Basic Information
              </h3>

              <label className="block text-[13px] text-[#232629] mb-[6px]">
                Display Name
              </label>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="
                  w-full
                  h-[38px]
                  border
                  border-[#b9bfc3]
                  rounded-[6px]
                  px-[10px]
                  text-[14px]
                  text-[#232629]
                  outline-none
                  focus:border-[#0074cc]
                "
              />

              <h3 className="m-0 mt-[26px] mb-[16px] text-[17px] font-bold text-[#232629]">
                About
              </h3>

              <label className="block text-[13px] text-[#232629] mb-[6px]">
                About Me
              </label>

              <textarea
                value={editAbout}
                onChange={(e) => setEditAbout(e.target.value)}
                className="
                  w-full
                  h-[128px]
                  resize-none
                  border
                  border-[#b9bfc3]
                  rounded-[6px]
                  px-[10px]
                  py-[9px]
                  text-[14px]
                  leading-[20px]
                  text-[#232629]
                  outline-none
                  focus:border-[#0074cc]
                "
              />

              <h3 className="m-0 mt-[26px] mb-[16px] text-[17px] font-bold text-[#232629]">
                Skills & Technologies
              </h3>

              <div className="flex gap-[8px]">

                <input
                  type="text"
                  placeholder="Add a skill or technology"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag();
                    }
                  }}
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

              <div className="flex flex-wrap gap-[8px] mt-[12px]">

                {editTags.map((tag) => (
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
                      onClick={() => handleRemoveTag(tag)}
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
                ))}

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div
              className="
                flex
                justify-end
                gap-[10px]
                border-t
                border-[#e1e4e6]
                px-[24px]
                py-[16px]
              "
            >

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="
                  border
                  border-[#d6d9dc]
                  bg-white
                  rounded-[6px]
                  px-[16px]
                  py-[8px]
                  text-[14px]
                  text-[#3b4045]
                  cursor-pointer
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="
                  border-0
                  bg-[#0d6efd]
                  text-white
                  rounded-[6px]
                  px-[18px]
                  py-[8px]
                  text-[14px]
                  cursor-pointer
                "
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

    </MainLayout>
  );
}