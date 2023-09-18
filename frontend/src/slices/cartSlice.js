import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// get from local storage or create an object with empty array
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], deliveryAdrress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      //check if the item already exists in the cart, if x matches payload id, save to existingItem
      const existingItem = state.cartItems.find((el) => el._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((el) =>
          el._id === existingItem._id ? item : el
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    saveDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      return updateCart(state);
    },

    // return cartItems that don't match the payload id
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveDeliveryAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
