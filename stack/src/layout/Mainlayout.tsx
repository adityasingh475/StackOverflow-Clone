import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import RightSideBar from "../../components/RightSideBar";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="grid w-full grid-cols-[235px_minmax(0,1fr)_300px] gap-6 px-6">
        <div className="w-[235px] min-w-[235px] border-r border-[#e1e4e6]">
          <Sidebar isOpen={true} onClose={() => {}} />
        </div>

        <main className="min-w-0 bg-white pt-[22px] pb-6">
          <div className="w-full">{children}</div>
        </main>

        <div className="w-[300px] min-w-[300px]">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;