"use client";
import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/lib/animation";
import { useBoolean } from "usehooks-ts";
import Filters from "@/components/ui/filters";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { filteredTasks } from "@/lib/utils";
import TaskItem from "@/components/task-item";
import { useGetTasksQuery } from "@/lib/redux/slice";
import { toggleTaskModal } from "@/lib/redux/slices/task-slice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { value: isOpen, setTrue: openModalForAdd } = useBoolean();
  const { tasks, priority } = useAppSelector((state) => state.task);
  const { data, isLoading, error } = useGetTasksQuery();

  // useRedirect("/login");

  const filtered = filteredTasks(data, priority.toLowerCase());
  console.log({ filtered });

  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="h-[16rem] w-full rounded-md border-2 border-dashed border-gray-400 py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out hover:border-none hover:bg-gray-300 dark:bg-slate-950"
          onClick={() => dispatch(toggleTaskModal({ open: true, type: "add" }))}
          variants={item}
        >
          Add New Task
        </motion.button>
        {filtered?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
      </motion.div>
    </main>
  );
}
