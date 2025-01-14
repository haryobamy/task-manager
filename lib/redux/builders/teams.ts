import { TAppEndpointBuilder } from "../types";

export const teamsEndpoints = (builder: TAppEndpointBuilder) => ({
  getTeams: builder.query<Team[], void>({
    query: () => "teams",
    providesTags: ["Teams"],
  }),
});
