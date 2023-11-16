//Slice for commuicating with server

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // payload comes from backend

      const { name, email, role } = action.payload;
      if (role === "admin") {
        localStorage.setItem("userInfo", JSON.stringify({ name, email, role }));
      } else {
        localStorage.setItem("userInfo", JSON.stringify({ name, email }));
      }
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
