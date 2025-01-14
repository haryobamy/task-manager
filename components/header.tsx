"use client";
import Link from "next/link";
import React from "react";
import { Github, Moon, CircleUserRound, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { toggleTaskModal } from "@/lib/redux/slices/task-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setIsDarkMode } from "@/lib/redux/slices/global-slice";

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tasks } = useAppSelector((state) => state.task);
  const { isDarkMode } = useAppSelector((state) => state.global);

  const activeTasks = tasks.filter((task) => task.status === "In Progress");

  const userId = "9090kirirjdj";
  const name = "Badmus";

  return (
    <header className="my-4 flex w-full items-center justify-between bg-[#f9f9f9] px-6 dark:bg-black dark:text-white">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to Taskfyer"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="flex h-[50px] items-center gap-[10.4rem]">
        <button
          className="rounded-[50px] bg-[#3aafae] px-8 py-3 text-white transition-all duration-200 ease-in-out hover:bg-[#00A1F1] hover:text-white"
          onClick={() => {
            if (userId) {
              // openModalForAdd();
              dispatch(toggleTaskModal({ open: true, type: "add" }));
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[#E6E6E6] text-lg text-purple-500"
          >
            <Github />
          </Link>
          <button
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[#E6E6E6] text-lg text-purple-500"
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
            ) : (
              <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
            )}
          </button>
          <Link
            href="https://github.com/Maclinz/taskfyer"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-[#E6E6E6] text-lg text-purple-500"
          >
            <CircleUserRound />
          </Link>
        </div>
      </div>
    </header>
  );
}
