//@ts-ignore
import { toast } from "react-toastify";
import { TAppEndpointBuilder } from "../types";
import { setTask, setTasks } from "../slices/task-slice";

export const taskEndpoints = (builder: TAppEndpointBuilder) => ({
  // Fetch all tasks
  getTasks: builder.query<any, void>({
    query: () => "/tasks",
    providesTags: ["Tasks"],

    async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
      try {
        const res = await queryFulfilled;
        const result = await res;
        if (result) {
          console.log(result, "result ffrom toolkit");
          dispatch(setTasks(res.data));
        }
      } catch (error) {}
    },
  }),

  // Fetch a single task
  getTask: builder.query({
    query: (taskId: string) => `/tasks/${taskId}`,
    // providesTags: (result, error, taskId) => [{ type: 'Tasks', id: taskId }],
    providesTags: ["Task"],
    async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
      try {
        const res = await queryFulfilled;
        const result = await res;
        if (result) {
          console.log(result, "result ffrom toolkit");
          dispatch(setTask(res.data));
        }
      } catch (error) {}
    },
  }),

  // Create a new task
  createTask: builder.mutation({
    query: (task: Task) => ({
      url: "/tasks",
      method: "POST",
      body: task,
    }),
    invalidatesTags: ["Tasks"],
    onQueryStarted: async (task, { queryFulfilled }) => {
      try {
        await queryFulfilled;
        toast.success("Task created successfully");
      } catch (error) {
        toast.error("Error creating task");
      }
    },
  }),

  // Update a task
  updateTask: builder.mutation({
    query: (task: any) => ({
      url: `/tasks/${task.id}`,
      method: "PATCH",
      body: task,
    }),
    invalidatesTags: ["Tasks"],
    onQueryStarted: async (task, { queryFulfilled }) => {
      try {
        await queryFulfilled;
        toast.success("Task updated successfully");
      } catch (_error) {
        toast.error("Error updating task");
      }
    },
  }),

  // Delete a task
  deleteTask: builder.mutation({
    query: (taskId) => ({
      url: `/tasks/${taskId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Tasks"],
    onQueryStarted: async (taskId, { queryFulfilled }) => {
      try {
        await queryFulfilled;
        toast.success("Task deleted successfully");
      } catch (_error) {
        toast.error("Error deleting task");
      }
    },
  }),
});
