import { createApi } from "@reduxjs/toolkit/query/react";
import { TAppEndpointBuilder, apiTagTypes } from "./types";
import getBaseQueryWithLogout from "./base-query";
import { BASE_URL } from "@/lib/env";
import { userEndpoints, taskEndpoints } from "./builders";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: getBaseQueryWithLogout(BASE_URL),
  tagTypes: apiTagTypes,
  endpoints: (builder: TAppEndpointBuilder) => ({
    ...userEndpoints(builder),
    ...taskEndpoints(builder),
  }),
});

export const {
  reducer: apiReducer,
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,

  useGetTasksQuery,
  useLazyGetTaskQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
