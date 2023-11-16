// helper function for decimal place
export const addDecimals = (number) => {
  return Math.round((number * 100) / 100).toFixed(2);
};

export const updateBasket = (state) => {
  console.log(state.products);
  // Calculate products price
  state.productsPrice = addDecimals(
    state.products.reduce((acc, product) => {
      console.log("product.price", product.price);
      console.log("product.quantity", product.quantity);
      return acc + product.price * product.quantity;
    }, 0)
  );

  // Calculate deliverry price       if order is over £100 free, else £10 delivery
  state.deliveryPrice = addDecimals(state.productsPrice > 100 ? 0 : 10);

  // Calculate tax price 15% tax
  state.taxPrice = addDecimals(Number(0.15 * state.productsPrice).toFixed(2));

  // Calculate total price
  state.totalPrice = (
    Number(state.productsPrice) +
    Number(state.deliveryPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  return state;
};
