
import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
// apiSlice is for async requests that create endpoints

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // mutation for changing data eg, POST, PUT, PATCH, DELETE, querry for just fetching, GET
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
