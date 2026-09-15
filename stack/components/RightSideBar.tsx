import {
  Pencil,
  MessageSquare,
  FileText,
  Eye,
} from "lucide-react";

const RightSideBar = () => {
  return (
    <aside className="w-full min-h-[calc(100vh-60px)] bg-[#f8f9fa] p-[20px]">

      {/* The Overflow Blog */}
      <div className="border border-[#e7e5b8] rounded-[4px] bg-[#fffbe6] mb-[20px]">
        <div className="p-[16px]">
          <h3 className="font-bold text-[16px] text-[#232629] mb-[14px]">
            The Overflow Blog
          </h3>

          <div className="flex gap-[10px] mb-[12px]">
            <Pencil size={16} strokeWidth={1.7} className="shrink-0" />
            <p className="m-0 text-[13px] leading-[18px] text-[#3b4045]">
              A new era of Stack Overflow
            </p>
          </div>

          <div className="flex gap-[10px]">
            <Pencil size={16} strokeWidth={1.7} className="shrink-0" />
            <p className="m-0 text-[13px] leading-[18px] text-[#3b4045]">
              How your favorite movie is changing language learning technology
            </p>
          </div>
        </div>
      </div>

      {/* Featured on Meta */}
      <div className="border border-[#e1e4e6] rounded-[4px] bg-white mb-[20px]">
        <div className="p-[16px]">
          <h3 className="font-bold text-[16px] text-[#232629] mb-[14px]">
            Featured on Meta
          </h3>

          <div className="flex gap-[10px] mb-[12px]">
            <MessageSquare size={16} strokeWidth={1.7} className="shrink-0" />
            <p className="m-0 text-[13px] leading-[18px] text-[#3b4045]">
              Results of the June 2025 Community Asks Sprint
            </p>
          </div>

          <div className="flex gap-[10px] mb-[12px]">
            <MessageSquare size={16} strokeWidth={1.7} className="shrink-0" />
            <p className="m-0 text-[13px] leading-[18px] text-[#3b4045]">
              Will you help build our new visual identity?
            </p>
          </div>

          <div className="flex gap-[10px]">
            <FileText size={16} strokeWidth={1.7} className="shrink-0" />
            <p className="m-0 text-[13px] leading-[18px] text-[#3b4045]">
              Policy: Generative AI (e.g., ChatGPT) is banned
            </p>
          </div>
        </div>
      </div>

      {/* Custom Filters */}
      <div className="mb-[22px]">
        <h3 className="font-bold text-[16px] text-[#232629] mb-[12px]">
          Custom Filters
        </h3>

        <button
          className="
            border
            border-[#7aa7c7]
            bg-white
            text-[#39739d]
            rounded-[4px]
            px-[12px]
            py-[7px]
            text-[13px]
            hover:bg-[#eff0f1]
          "
        >
          Create a custom filter
        </button>
      </div>

      {/* Watched Tags */}
      <div>
        <h3 className="font-bold text-[16px] text-[#232629] mb-[30px]">
          Watched Tags
        </h3>

        <div className="flex flex-col items-center text-center">
          <Eye size={48} strokeWidth={1.3} className="text-[#c3c7ca] mb-[14px]" />

          <p className="text-[13px] leading-[18px] text-[#6a737c] m-0 mb-[12px]">
            Watch tags to curate your list of questions.
          </p>

          <button
            className="
              border
              border-[#7aa7c7]
              bg-white
              text-[#39739d]
              rounded-[4px]
              px-[12px]
              py-[7px]
              text-[13px]
              hover:bg-[#eff0f1]
            "
          >
            👁 Watch a tag
          </button>
        </div>
      </div>

    </aside>
  );
};

export default RightSideBar;