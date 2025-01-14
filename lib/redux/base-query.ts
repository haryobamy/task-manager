import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

const getBaseQueryWithLogout = (baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
  });

  const baseQueryWithLogout: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const response = result.meta?.response;

    // const user =
    //   (api?.getState() as RootState).auth.user || ({} as unknown as IUser);

    // const { logout: logoutWithDeviceInfo } = useLogout();

    if (response?.statusText === "Unauthorized" && response?.status === 401) {
      // all logout logic here
      toast("Your session expired!", {
        type: "error",
        toastId: "session-expired",
      });

      //api.dispatch(logout(user?.userId as string));
    }
    return result;
  };

  return baseQueryWithLogout;
};

export default getBaseQueryWithLogout;
