import { api } from "../baseApi";
import { LoginData, LoginParams, RegisterParams } from "./login.types";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation<LoginData, LoginParams>({
      query: (body) => ({ url: "/api/users/login", body, method: "POST" }),
    }),
    postRegister: builder.mutation<{ message: string }, RegisterParams>({
      query: (body) => ({ url: "/api/users/register", body, method: "POST" }),
    }),
  }),
});

export const { usePostLoginMutation, usePostRegisterMutation } = extendedApi;
