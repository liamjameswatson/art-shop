export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";
// export const BASE_URL = " ";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const UPLOADS_URL = "/api/uploads";
export const PAYPAL_URL = "/api/config/paypal";
// export const STRIPE_URL = "/api/config/stripe";
export const STRIPE_URL = "/api/stripe";

// const name = "fourth.jgp";
// const splitName = name.split(".");
// splitName.pop();
// const splitNameJoin = splitName.join(".");
// // const splitNamejoin = splitNamePop.join('')

// console.log(name);
// console.log(splitName);
// console.log(splitNameJoin);

// // console.log(splitNamejoin)
