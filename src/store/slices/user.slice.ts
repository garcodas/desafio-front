import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";
import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  FullName: "",
  Email: "",
  BirthDate: new Date(),
  Phone: "",
  Token: "",
  RoleId: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.Id = action.payload.Id;
      state.FullName = action.payload.FullName;
      state.Email = action.payload.Email;
      state.BirthDate = action.payload.BirthDate;
      state.Phone = action.payload.Phone;
      state.Token = action.payload.Token;
      state.RoleId = action.payload.RoleId;
    },
    logOutUser: (state) => {
      state.FullName = "";
      state.Email = "";
      state.BirthDate = new Date();
      state.Phone = "";
      state.Token = "";
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
