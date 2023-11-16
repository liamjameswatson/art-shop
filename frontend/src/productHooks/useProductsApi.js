import { PRODUCTS_URL } from "../constants";

export async function getProducts() {
  const response = await fetch(`${PRODUCTS_URL}`);
  console.log(response);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${PRODUCTS_URL}/${id}`);

  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "DELETE",
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function createProduct(data) {
  // Create a JSON object with the data
  const requestData = {
    name: data.name,
    description: data.description,
    image: data.image,
    otherImages: data.otherImages,
    category: data.category,
    price: data.price,
    stockNumber: data.stockNumber,
  };

  const response = await fetch(`${PRODUCTS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  console.log(response);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }

  return response.json();
}

export async function editProduct(data) {
  const { id, ...updateData } = data;
  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  console.log(response);
}
