import Header from "@/components/header";
import LeftSidebar from "@/components/left-sidebar";
import MiniSidebar from "@/components/mini-sidebar";
import TaskModal from "@/components/task-modal";
import React, { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden dark:bg-black dark:text-white">
      {/* mini sidebar */}
      <MiniSidebar />

      <div className="flex flex-1 flex-col">
        {/* header */}
        <Header />
        <main className="flex h-full pb-[1.5rem] pr-[20rem]">
          <div className="main-layout flex-1 overflow-auto rounded-[1.5rem] border-2 border-white bg-[#EDEDED] bg-black/50 p-4">
            <TaskModal />
            {/* {isEditing && <Modal />}
      {profileModal && <ProfileModal />} */}
            {children}
            <LeftSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}
