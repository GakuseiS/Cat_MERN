import { api } from "../baseApi";
import { ProductData } from "./product.types";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainProducts: builder.query<ProductData, void>({ query: () => "api/cards" }),
    getSupplements: builder.query<Omit<ProductData, "img" | "taste">, void>({ query: () => "api/addons" }),
    postProduct: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({ url: "/api/card", method: "post", body: id }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetMainProductsQuery, useGetSupplementsQuery, usePostProductMutation } = extendedApi;
