import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
// apiSlice is for async requests that create endpoints

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCTS_URL }),
      keepUnusedDataFor: 5, // how long data should be kept in the cache - 5 secs
    }),
    getProductDetails: builder.query({
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // stop sample being cached, and cache the fresh data. Prevents having to reload the page after creating a new projuct
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } =
  productsApiSlice;
