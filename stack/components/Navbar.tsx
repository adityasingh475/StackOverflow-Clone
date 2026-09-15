import Link from "next/link";

import React from "react";

import {
  Search,
  Menu,
} from "lucide-react";

import { useAuth } from "@/lib/AuthContext";

import { toast } from "react-toastify";

const Navbar = ({
  handleSlideIn,
}: any) => {

  const { setUser } =
    useAuth();

  const handleLogout = () => {

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    toast.info(
      "Logged out"
    );
  };

  return (

    <header className="h-[48px] bg-white border-b border-[#e1e4e6]">

      <div className="max-w-[1200px] mx-auto h-full flex items-center px-[8px]">

        {/* LOGO */}

        <Link
          href="/"
          className="flex items-center gap-[5px] no-underline"
        >

          <img
            src="/logo.png"
            alt="CodeQuest"
            className="w-[20px] h-[20px] object-contain"
          />

          <span className="text-[13px] font-bold text-[#232629]">
            CodeQuest
          </span>

        </Link>

        {/* NAVIGATION */}

        <div className="ml-[35px] flex items-center gap-[28px]">

          <Link
            href="/"
            className="text-[11px] text-[#3b4045] no-underline"
          >
            About
          </Link>

          <Link
            href="/"
            className="text-[11px] text-[#3b4045] no-underline"
          >
            Products
          </Link>

          <Link
            href="/"
            className="text-[11px] text-[#3b4045] no-underline"
          >
            For Teams
          </Link>

        </div>

        {/* SEARCH */}

        <div className="ml-[28px] flex-1 max-w-[455px]">

          <div className="relative">

            <Search
              size={14}
              className="absolute left-[9px] top-1/2 -translate-y-1/2 text-[#6a737c]"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                h-[30px]
                pl-[30px]
                pr-[10px]
                border
                border-[#babfc4]
                rounded-[3px]
                outline-none
                text-[11px]
              "
            />

          </div>

        </div>

        {/* USER */}

        <div className="ml-[10px] flex items-center gap-[8px]">

          <div
            className="
              w-[27px]
              h-[27px]
              rounded-full
              bg-[#f48225]
              text-white
              text-[11px]
              font-bold
              flex
              items-center
              justify-center
            "
          >
            A
          </div>

          <button
            onClick={handleLogout}
            className="
              h-[28px]
              px-[11px]
              border
              border-[#8fc5df]
              bg-[#e1f3fa]
              rounded-[3px]
              text-[10px]
              text-[#3b4045]
            "
          >
            Log out
          </button>

        </div>

        {/* MOBILE MENU */}

        <button
          onClick={handleSlideIn}
          className="hidden max-md:flex ml-3"
        >
          <Menu size={18} />
        </button>

      </div>

    </header>
  );
};

export default Navbar;