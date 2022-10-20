import { serviceApi } from "./service";

type ProgrammBody = {
  name: string;
  weight: number;
  age: number;
  type: string;
  email: string;
  tel: string;
  comment: string;
  sugar: string;
  water: string;
  milk: string;
  vitamin: string;
};

const extendedApi = serviceApi.injectEndpoints({
  endpoints: (builder) => ({
    postProgramm: builder.mutation<{ message: string }, ProgrammBody>({
      query: (data) => ({ url: "api/form", body: data, method: "POST" }),
    }),
  }),
});

export const { usePostProgrammMutation } = extendedApi;
