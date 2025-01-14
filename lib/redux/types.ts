import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryActionCreatorResult,
  QueryDefinition,
} from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const apiTagTypes = ["Projects", "Tasks", "Users", "Teams",'Task'] as const;

export type TApiTag = (typeof apiTagTypes)[number];

export type TQueryActionCreatorResult = QueryActionCreatorResult<
  QueryDefinition<
    unknown,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TApiTag,
    unknown,
    "api"
  >
>;

export type TAppEndpointBuilder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  TApiTag,
  "api"
>;
