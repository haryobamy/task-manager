import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer, apiReducerPath } from "./slice";
import globalReducer from "./slices/global-slice";
import taskReducer from "./slices/task-slice"

export default combineReducers({
  global: globalReducer,
  task:taskReducer,
  [apiReducerPath]: apiReducer,
});
