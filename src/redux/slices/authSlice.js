import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    avatarUrl: "",
    role: "",
    // driver customer admin
    cmnd: "",
    phone: "",
  },
  reducers: {
    setAuth: (state, action) => ({
      ...action.payload,
    }),
  },
});
export const { setAuth } = authSlice.actions;
export const selectUserData = (state) => state.auth;
export default authSlice.reducer;
