import { createSlice } from "@reduxjs/toolkit";

export const submissionSlice = createSlice({
  name: "submissions",
  initialState: {
    allSubmissions: [], // Add an array to hold all submissions
  },
  reducers: {
    setSubmissions: (state, action) => {
      state.allSubmissions = action.payload;
    },
  },
});

export const { setSubmissions } = submissionSlice.actions;

export default submissionSlice.reducer;
