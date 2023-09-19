// helper function for decimal place
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// called everytime the cart state is updated, the new price is calculated and saved to local storage
export const updateCart = (state) => {
  // Calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Calculate delivery price (If order over £100 shipping is free, else £10)
  state.deliveryPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.deliveryPrice)
  ).toFixed(2);

  // save state to local storage, under cart
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
