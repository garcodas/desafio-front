import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  FullName: "",
  Email: "",
  BirthDate: new Date(),
  Phone: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.FullName = action.payload.FullName;
      state.Email = action.payload.Email;
      state.BirthDate = action.payload.BirthDate;
      state.Phone = action.payload.Phone;
    },
    logOut: (state) => {
      state.FullName = "";
      state.Email = "";
      state.BirthDate = new Date();
      state.Phone = "";
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;