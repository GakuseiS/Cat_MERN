import { serviceApi } from "./service";

type TCard = {
  id: number;
  allPrice: number;
  items?: {
    id: string;
    title: string;
    size: string;
    taste: string;
    price: string;
    count: string;
  }[];
};

const extendedApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<TCard, void>({ query: () => "api/card", providesTags: ["BASKET"] }),
    deleteBasket: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/api/card", method: "delete" }),
      invalidatesTags: ["BASKET"],
    }),
    deleteBasketItem: builder.mutation<{ message: string }, { id: string }>({
      query: (data) => ({ url: `/api/card/${data.id}`, method: "delete" }),
      invalidatesTags: ["BASKET"],
    }),
  }),
});

export const { useGetBasketQuery, useDeleteBasketMutation, useDeleteBasketItemMutation } = extendedApi;
