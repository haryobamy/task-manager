import React from "react";
import RadialCHart from "./radial-chart";

export default function LeftSidebar() {
  return (
    <div className="fixed right-0 top-0 mt-[5rem] flex h-[calc(100%-5rem)] w-[20rem] flex-col bg-[#f9f9f9] dark:bg-slate-950">
      {/* <Profile /> */}
      <div className="mx-6 mt-4">
        <RadialCHart />
      </div>

      <button
        className="mx-6 mb-6 mt-auto rounded-[50px] bg-[#EB4E31] px-8 py-4 text-white transition duration-200 ease-in-out hover:bg-[#3aafae]"
        // onClick={logoutUser}
      >
        Sign Out
      </button>
    </div>
  );
}
