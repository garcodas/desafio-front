import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import cartSlice from "./cart.slice";

const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
});

export default rootReducer;
