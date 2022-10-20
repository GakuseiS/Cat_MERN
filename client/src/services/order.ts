import { serviceApi } from "./service";

type TOrder = {
  id: string;
  createdAt: string;
  allPrice: number;
  items: {
    id: string;
    title: string;
    size: string;
    taste: string;
    price: string;
    count: string;
  }[];
}[];

const extendedApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<TOrder, void>({ query: () => "api/orders" }),
    postOrder: builder.mutation<{ message: string }, { id: number }>({
      query: (data) => ({ url: "/api/orders", method: "post", body: data }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetOrdersQuery, usePostOrderMutation } = extendedApi;
