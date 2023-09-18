import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    id: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
