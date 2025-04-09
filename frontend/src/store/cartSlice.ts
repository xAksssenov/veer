import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import data from "../data/cards.json";
import { Card } from "../Types/cardType";

export interface CartItem {
  id: number;
  quantity: number;
  card: Card;
}

interface CartState {
  cart: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState: CartState = {
  cart: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const card = data.find((item) => item.id === id);
      if (!card) return;

      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ id, quantity: 1, card });
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
