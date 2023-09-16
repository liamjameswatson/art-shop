import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// createApi is a helper function that creates a Redux Toolkit API and allows endpoints to be added to the API.

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
