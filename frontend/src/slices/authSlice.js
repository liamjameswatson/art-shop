//Slice for commuicating with server

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // get from local storage or set
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null, // stored as string, parse on retrieval to turn back into object
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // payload comes from backend
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
