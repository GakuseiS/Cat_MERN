import { serviceApi } from "./service";

const extendedApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<{ token: string; userId: string }, { email: string; password: string }>({
      query: (data) => ({ url: "/api/users/login", body: data, method: "POST" }),
    }),
    postRegister: builder.mutation<{ message: string }, { name: string; email: string; password: string }>({
      query: (data) => ({ url: "/api/users/register", body: data, method: "POST" }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = extendedApi;
