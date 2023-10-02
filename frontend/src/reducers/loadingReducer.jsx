import { createSlice } from "@reduxjs/toolkit";

export const submissionLoadingSlice = createSlice({
  name: "Loading",
  initialState: {
       status: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setLoading } = submissionLoadingSlice.actions;

export default submissionLoadingSlice.reducer;
