import { ORDERS_URL, PAYPAL_URL, STRIPE_URL } from "../constants";

export async function getAllOrders() {
  const response = await fetch(`${ORDERS_URL}`);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function getMyOrders() {
  const response = await fetch(`${ORDERS_URL}/myorders`);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function createOrder(data) {
  const requestData = {
    orderItems: data.orderItems,
    deliveryAddress: data.deliveryAddress,
    paymentMethod: data.paymentMethod,
    itemsPrice: data.itemsPrice,
    taxPrice: data.taxPrice,
    deliveryPrice: data.deliveryPrice,
    totalPrice: data.totalPrice,
  };

  const response = await fetch(`${ORDERS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...requestData }),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("created order from api", response);
  return response.json();
}

export async function getOrderById(id) {
  const response = await fetch(`${ORDERS_URL}/${id}`);

  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function usePayOrderWithPayPal({ orderId, details }) {
  const response = await fetch(`${ORDERS_URL}/${orderId}/paypal`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...details }),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("payment added from paypal", response);
  return response.json();
}

export async function getPayPalClientId() {
  const response = await fetch("/api/config/paypal");
  if (!response.ok) {
    throw new Error("Failed to fetch PayPal client ID");
  }

  const data = await response.json();
  console.log(data);
  return data.clientId;
}

export async function createCheckoutSession(data) {
  const requestData = {
    userId: data.user._id,
    cartItems: data.orderItems,
  };
  console.log({ requestData });
  const response = await fetch(`${STRIPE_URL}/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...requestData }),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("payment added from stripe", response);
  return response.json();
}

export async function usePayOrderWithCard({ orderId, order }) {
  const response = await fetch(`${ORDERS_URL}/${orderId}/payWithCard`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...order }),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("payment added from stripe", response);
  return response.json();
}

export async function getPublishableStripeKey() {
  const response = await fetch("/api/config/stripe");
  if (!response.ok) {
    throw (
      (new Error("Failed to fetch Stripe client ID"), console.log("failed"))
    );
  }
  const data = await response.json();
  return data;
}

export async function getSecretStripeKey() {
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("payment intent added", response);
  return response.json();
}

export async function editOrder(data) {
  console.log("data from edit order", data);
  const response = await fetch(`${ORDERS_URL}/pay`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  console.log("payment intent added", response);
  return response.json();
}




