import { TAppEndpointBuilder } from "../types";

export const projectEndpoints = (builder: TAppEndpointBuilder) => ({
  getProjects: builder.query<Project[], void>({
    query: () => ({
      url: "projects",
      method: "GET",
    }),
    providesTags: ["Projects"],
  }),

  createProject: builder.mutation<Project, Partial<Project>>({
    query: (project) => ({
      url: "projects",
      method: "POST",
      body: project,
    }),
    invalidatesTags: ["Projects"],
  }),
});
