import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    location: {
      pickup: {
        name: undefined,
        coordinates: {
          lat: "",
          lng: "",
        },
        id: "",
      },
      destination: {
        name: undefined,
        coordinates: {
          lat: "",
          lng: "",
        },
        id: "",
      },
    },
    date_department: "",
  },
  reducers: {
    setBooking: (state, action) => ({
      ...action.payload,
    }),
  },
});
export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
