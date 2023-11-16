//Slice for commuicating with server

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // // get from local storage or set it to null if not
  // userInfo: localStorage.getItem("userInfo")
  //   ? JSON.parse(localStorage.getItem("userInfo"))
  //   : null, // stored as string, parse on retrieval to turn back into object
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // payload comes from backend

      const { name, email, role } = action.payload;
      console.log("rolllllleeeeeeeeeeeeee", role);
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

/////// Sets in localStorage only email and name. not role. Then gets the stuff from local storage.

/// USE PERSIST
/// USE GETUSERBYID

// THIS NEEDS TO BE FIXED!!!!!
