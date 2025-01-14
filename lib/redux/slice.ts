import { createApi } from "@reduxjs/toolkit/query/react";
import { TAppEndpointBuilder, apiTagTypes } from "./types";
import getBaseQueryWithLogout from "./base-query";
import { BASE_URL } from "@/lib/env";
import {
  projectEndpoints,
  userEndpoints,
  taskEndpoints,
  teamsEndpoints,
} from "./builders";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: getBaseQueryWithLogout(BASE_URL),
  tagTypes: apiTagTypes,
  endpoints: (builder: TAppEndpointBuilder) => ({
    ...userEndpoints(builder),
    ...projectEndpoints(builder),
    ...taskEndpoints(builder),
    ...teamsEndpoints(builder),
  }),
});

export const {
  reducer: apiReducer,
  reducerPath: apiReducerPath,
  middleware: apiMiddleware,
  // useGetAuthUserQuery,

  useGetProjectsQuery,
  useGetTasksQuery,
  useLazyGetTaskQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,

  useDeleteTaskMutation,
  useGetTeamsQuery,
  // useGetUsersQuery,
} = apiSlice;
