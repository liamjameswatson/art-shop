import { useProduct } from "../productHooks/useProduct";


export function stockChecker(order) {
  console.log("order from stockchecker =", order);

  const products = order.orderItems;

let productAndQuantity = []
  // Log productId and quantity for each order item
  products.forEach((product) => {
    // const productId = product.product._id; // Assuming the product object has an "_id" property
    // const quantity = product.quantity;
    console.log(
      `Product ID: ${product.product}, Quantity: ${product.quantity}`
    );
  });
}
