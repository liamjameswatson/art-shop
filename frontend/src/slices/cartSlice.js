import { createSlice } from "@reduxjs/toolkit";

// get from local storage or create an object with empty array
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

// helper function for decimal place
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      //check if the item already exists in the cart, if x matches payload id, save to existingItem
      const existingItem = state.cartItems.find((el) => el._id === item._id);

      if (existingItem) {
        state.cartItem = state.cartItems.map((el) =>
          el._id === existingItem._id ? item : el
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      // Calculate item price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
      );

      // Calculate delivery price (If order over £100 shipping is free, else £10)
      state.deliveryPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((state.itemsPrice * 0.15).toFixed(2))
      );

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.taxPrice) +
        Number(state.deliveryPrice)
      ).toFixed(2);

      // save state to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
