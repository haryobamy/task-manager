import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { item } from "@/lib/animation";
import { Edit, Star, Trash } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/store";
import { formatTime } from "@/lib/utils";
import { useDeleteTaskMutation, useLazyGetTaskQuery } from "@/lib/redux/slice";
import { toggleTaskModal } from "@/lib/redux/slices/task-slice";

type Props = {
  task: Task;
};
export default function TaskItem({ task }: Props) {
  const dispatch = useAppDispatch();
  const [getTaskQuery, { isLoading }] = useLazyGetTaskQuery();
  const [deleteTaskMutation, { isLoading: deleting }] = useDeleteTaskMutation();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const getTask = useCallback(async (id: string) => {
    await getTaskQuery(id);
  }, []);
  const deleteTask = useCallback(async (id: string) => {
    await deleteTaskMutation(id);
  }, []);
  return (
    <motion.div
      className="flex h-[16rem] flex-col gap-4 rounded-lg border-2 border-white bg-[#f9f9f9] px-4 py-3 shadow-sm dark:bg-slate-950"
      variants={item}
    >
      <div>
        <h4 className="text-2xl font-bold">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-[1.2rem] text-gray-400">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              <Star />
            </button>
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTask(task.id);
                dispatch(toggleTaskModal({ open: true, type: "edit" }));
              }}
            >
              <Edit />
            </button>
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
