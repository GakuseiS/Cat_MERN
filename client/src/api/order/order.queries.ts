import { api } from "../baseApi";
import { OrderData } from "./order.types";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrderData, void>({ query: () => "api/orders" }),
    postOrder: builder.mutation<{ message: string }, { id: number }>({
      query: (data) => ({ url: "/api/orders", method: "post", body: data }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetOrdersQuery, usePostOrderMutation } = extendedApi;
