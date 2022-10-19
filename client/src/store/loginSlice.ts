import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userId: "",
};

const storageName = "userData";

const loginSlice = createSlice({
  initialState,
  name: "login",
  reducers: {
    login: (state, action: PayloadAction<{ token: string; userId: string }>) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId,
          token,
        })
      );
    },
    logout: (state) => {
      localStorage.removeItem(storageName);
      state.token = "";
      state.userId = "";
    },
    initLogin: (state) => {
      const data = JSON.parse(localStorage.getItem(storageName) || "{}");

      if (data?.token && data?.userId) {
        state.token = data.token;
        state.userId = data.userId;
      }
    },
  },
});

export const { login, logout, initLogin } = loginSlice.actions;
export default loginSlice.reducer;
