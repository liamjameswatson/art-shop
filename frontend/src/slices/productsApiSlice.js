import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
    }),
    keepUnusedDataFor: 5, // how long data should be kept in the cache - 5 secs
  }),
});

export const { useGetProductsQuery } = productsApiSlice;