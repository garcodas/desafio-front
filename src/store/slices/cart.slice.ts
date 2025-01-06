import { CartState } from "@/types/cart";
import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleChart: (state) => {
      state.isOpen = !state.isOpen;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.items.find(
        (item) => item.Id === action.payload.Id
      );

      if (existingProduct) {
        existingProduct.OrderQty =
          (existingProduct.OrderQty || 0) + (action.payload.OrderQty || 1);
      } else {
        state.items.push({
          ...action.payload,
          OrderQty: action.payload.OrderQty || 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.Id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { toggleChart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
