import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { Login, loading } = useAuth();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setform({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await Login(form);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9f9] flex flex-col items-center justify-center">

      {/* LOGO */}
      <div className="flex items-center gap-[8px] mb-[28px]">
        <div className="w-[35px] h-[35px] border-[4px] border-[#f48024] rounded-[4px] flex items-center justify-center">
          <div className="w-[11px] h-[11px] border-[3px] border-[#f48024] rounded-[1px]" />
        </div>

        <span className="text-[22px] font-bold text-[#232629]">
          stackoverflow
        </span>
      </div>

      {/* LOGIN CARD */}
      <div
        className="
          w-[500px]
          bg-white
          border
          border-[#d6d9dc]
          rounded-[8px]
          shadow-[0_2px_4px_rgba(0,0,0,0.08)]
          px-[25px]
          py-[25px]
        "
      >

        {/* TITLE */}
        <h1 className="text-center text-[26px] leading-[32px] font-bold text-[#232629] m-0 mb-[12px]">
          Log in to your account
        </h1>

        {/* SUBTITLE */}
        <p className="text-center text-[16px] leading-[20px] text-[#6a737c] m-0 mb-[25px]">
          Enter your email and password to access Stack Overflow
        </p>

        {/* GOOGLE */}
        <button
          type="button"
          className="
            w-full
            h-[46px]
            border
            border-[#d6d9dc]
            rounded-[6px]
            bg-white
            flex
            items-center
            justify-center
            gap-[12px]
            text-[16px]
            text-[#232629]
            hover:bg-[#f8f9f9]
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.79-.07-1.55-.23-2.23H12v4.22h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.35z"
            />
            <path
              fill="#34A853"
              d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.75 9.75 0 0 0 12 21.6z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.72A5.86 5.86 0 0 1 6.23 12c0-.6.1-1.18.31-1.72v-2.5H3.3A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.22l3.24-2.5z"
            />
            <path
              fill="#EA4335"
              d="M12 6.25c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.35 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.7 5.38l3.24 2.5C7.31 7.97 9.46 6.25 12 6.25z"
            />
          </svg>

          <span>Log in with Google</span>
        </button>

        {/* GITHUB */}
        <button
          type="button"
          className="
            w-full
            h-[46px]
            mt-[12px]
            border
            border-[#d6d9dc]
            rounded-[6px]
            bg-white
            flex
            items-center
            justify-center
            gap-[12px]
            text-[16px]
            text-[#232629]
            hover:bg-[#f8f9f9]
          "
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="#181717"
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.55v-2.16c-3.19.69-3.86-1.54-3.86-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>

          <span>Log in with GitHub</span>
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-[10px] my-[20px]">
          <div className="flex-1 h-[1px] bg-[#e1e4e6]" />

          <span className="text-[12px] text-[#6a737c] whitespace-nowrap">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-[1px] bg-[#e1e4e6]" />
        </div>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <label className="block text-[15px] font-medium text-[#232629] mb-[7px]">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={form.email}
            onChange={handleChange}
            className="
              w-full
              h-[46px]
              border
              border-[#b9bfc3]
              rounded-[6px]
              px-[12px]
              text-[15px]
              text-[#232629]
              outline-none
              focus:border-[#0074cc]
            "
          />

          {/* PASSWORD */}
          <label className="block text-[15px] font-medium text-[#232629] mt-[18px] mb-[7px]">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="
              w-full
              h-[46px]
              border
              border-[#b9bfc3]
              rounded-[6px]
              px-[12px]
              text-[15px]
              text-[#232629]
              outline-none
              focus:border-[#0074cc]
            "
          />

          {/* LOGIN */}
          <button
            type="submit"
            className="
              w-full
              h-[46px]
              mt-[16px]
              rounded-[6px]
              bg-[#0d6efd]
              text-white
              text-[15px]
              font-medium
              hover:bg-[#0b5ed7]
            "
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        {/* FORGOT */}
        <div className="text-center mt-[17px]">
          <Link
            href="#"
            className="text-[15px] text-[#39739d]"
          >
            Forgot your password?
          </Link>
        </div>

        {/* SIGN UP */}
        <p className="text-center text-[15px] text-[#232629] m-0 mt-[20px]">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#39739d]"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}