import { setPriority } from "@/lib/redux/slices/task-slice";
import { useAppDispatch } from "@/lib/redux/store";
import React from "react";

export default function Filters() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useAppDispatch();

  const priorities = ["All", "Critical", "Low", "Medium", "High"];
  return (
    <div className="relative grid grid-cols-5 items-center gap-3 rounded-md border-2 border-white bg-[#F9F9F9] px-2 py-2 dark:bg-slate-950">
      <span
        className="absolute left-[5px] rounded-md bg-[#EDEDED] transition-all duration-300"
        style={{
          width: "calc(100% / 5 - 10px)",
          height: "calc(100% - 10px)",
          top: "50%",
          transform: `translate(calc(${activeIndex * 100}% + ${
            activeIndex * 10
          }px), -50%)`,
          transition: "transform 300ms cubic-bezier(.95,.03,1,1)",
        }}
      ></span>
      {priorities.map((priority, index) => (
        <button
          key={index}
          className={`relative z-10 px-1 text-sm font-medium ${
            activeIndex === index ? "text-[#3aafae]" : "text-gray-500"
          }`}
          onClick={() => {
            setActiveIndex(index);
            dispatch(setPriority(priority.toLowerCase()));
          }}
        >
          {priority}
        </button>
      ))}
    </div>
  );
}
