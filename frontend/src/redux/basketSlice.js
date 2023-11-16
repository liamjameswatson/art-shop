import { createSlice } from "@reduxjs/toolkit";
import { updateBasket } from "../utils/basketUtils";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    products: [],
  },
  reducers: {
    addProductToBasket: (state, action) => {
      const pendingProduct = action.payload;
      console.log({ action });

      //check if the item already exists in the cart, if product matches payload id, save to existingItem
      const existingItem = state.products.find(
        (product) => product._id === pendingProduct._id
      );

      if (existingItem) {
        state.products = state.products.map((product) =>
          product._id === existingItem._id ? pendingProduct : product
        );
      } else {
        state.products = [...state.products, pendingProduct];
      }

      return updateBasket(state);
    },
    // return cartItems that don't match the payload id
    deleteProductFromBasket: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      return updateBasket(state);
    },
    removeAllProducts: (state) => {
      console.log("REMOVING.........");
      console.log("STATAAAAA");
      state.products = []; 
      return updateBasket(state);
    },
    saveDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      return updateBasket(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateBasket(state);
    },
  },
});

export const {
  addProductToBasket,
  deleteProductFromBasket,
  saveDeliveryAddress,
  savePaymentMethod,
  removeAllProducts,
} = basketSlice.actions;

export default basketSlice.reducer;
