import { serviceApi } from "./service";

type ProductItem = {
  id: string;
  type: string;
  title: string;
  img: string;
  size: string;
  taste: string;
  price: number;
}[];

const extendedApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainProducts: builder.query<ProductItem, void>({ query: () => "api/cards" }),
    getSupplements: builder.query<Omit<ProductItem, "img" | "taste">, void>({ query: () => "api/addons" }),
    postProduct: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({ url: "/api/card", method: "post", body: id }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetMainProductsQuery, useGetSupplementsQuery, usePostProductMutation } = extendedApi;
