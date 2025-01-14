"use client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import React, { useEffect } from "react";
import ModalPage from "./modal-page";
import { toggleTaskModal } from "@/lib/redux/slices/task-slice";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "@/lib/redux/slice";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  priority: z.string(),
  dueDate: z.string(),
  completed: z.string(),
});

export default function TaskModal() {
  const dispatch = useAppDispatch();
  const { openTaskModal, modalMode, task } = useAppSelector(
    (state) => state.task,
  );
  const [createTask, { isLoading, error }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      completed: "false",
      dueDate: new Date().toLocaleDateString(),
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && openTaskModal) {
      form.setValue("completed", task?.completed.toString() || "");
      form.setValue("description", task?.description || "");
      form.setValue("dueDate", (task as Task)?.dueDate);
      form.setValue("priority", task?.priority.toLowerCase() || "");
      form.setValue("title", task?.title || "");
      return;
    }
    if (openTaskModal && modalMode === "add") {
      form.reset();
      return;
    }
  }, [modalMode, openTaskModal, task]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;
    console.log(values);
    if (modalMode === "edit") {
      const isCompleted = values.completed === "true" ? true : false;
      const payload = {
        ...values,
        ...task,
        _id: task?._id as string,
        id: task?.id as string,
        dueDate: new Date(values?.dueDate).toLocaleDateString(),
        completed: isCompleted,
        status: isCompleted ? "Completed" : "In Progress",
        updatedAt: new Date().toLocaleDateString(),
      };
      updateTask(payload);
    } else if (modalMode === "add") {
      const isCompleted = values.completed === "true" ? true : false;
      const payload = {
        ...values,
        _id: "rriii",
        dueDate: new Date(values?.dueDate).toLocaleDateString(),
        completed: isCompleted,
        status: isCompleted ? "Completed" : "In Progress",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: "",
        id: "sjdjdjdjd",
      };
      createTask(payload);
    }
    dispatch(toggleTaskModal({ open: false, type: "" }));
  }

  return (
    <ModalPage
      className="w-[600px] max-w-[600px] border-0 bg-transparent md:h-[65%] lg:h-[60%]"
      isOpen={openTaskModal}
      onClose={() => dispatch(toggleTaskModal({ open: false, type: "" }))}
    >
      <Card
        className={cn(
          "!gradient-border border-gradient-to-r h-full overflow-y-auto rounded-2xl border-4 border-solid border-[#CAD3FD] !bg-slate-50 py-8 pb-0 shadow-2xl",
        )}
      >
        <CardContent>
          <Form {...form}>
            <form
              className="absolute left-1/2 top-1/2 flex w-full max-w-[520px] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-3 rounded-lg px-6 py-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select task priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter description "
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Completed</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select task priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"true"}>Yes</SelectItem>
                          <SelectItem value={"false"}>No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-5">
                {modalMode === "edit" ? "Update Task" : "Create Task"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ModalPage>
  );
}
