import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import bookingSlice from "../slices/bookingSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    booking: bookingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
