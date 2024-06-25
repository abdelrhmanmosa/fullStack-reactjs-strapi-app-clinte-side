import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookieServices from "../../services/cookieServices";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  //** Get

  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/products?populate=category&populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=20`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    //** Update
    updateDashboardProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
          // "Content-Type": "application/json",
        },
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getDashboardProducts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    //** create
    addDashboardProduct: build.mutation({
      query: ({ body }) => ({
        url: `/api/products`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieServices.get("jwt")}`,
        },
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    getProduct: build.query({
      query(id) {
        return {
          url: `/api/products/${id}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Products", id: result.data.id },
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    //** Delete
    deleteDashboardProduct: build.mutation({
      query(id) {
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${CookieServices.get("jwt")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useAddDashboardProductMutation,
  useGetProductQuery
} = apiSlice;
