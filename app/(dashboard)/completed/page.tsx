"use client";
import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Filters from "@/components/ui/filters";
import { container, item } from "@/lib/animation";
import TaskItem from "@/components/task-item";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { filteredTasks } from "@/lib/utils";
import { setPriority } from "@/lib/redux/slices/task-slice";
import { useGetTasksQuery } from "@/lib/redux/slice";

export default function CompletedPage() {
  const dispatch = useAppDispatch();
  const { tasks, priority } = useAppSelector((state) => state.task);

  const { data, isLoading, error } = useGetTasksQuery();

  const completedTasks = data?.filter((task: Task) => task?.completed);
  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {
    dispatch(setPriority("all"));
  }, []);
  return (
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem] pb-[2rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.button
          className="h-[16rem] w-full rounded-md border-2 border-dashed border-gray-400 py-2 text-lg font-medium text-gray-500 transition duration-200 ease-in-out hover:border-none hover:bg-gray-300"
          // onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
