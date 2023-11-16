import { UPLOADS_URL } from "../constants";

export async function uploadProductImage(formData) {
  const response = await fetch(`${UPLOADS_URL}`, {
    method: "POST",
    body: formData,
  });
  console.log(response);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }

  return response.json();
}

export async function uploadOtherImages(formData) {
  const response = await fetch(`${UPLOADS_URL}/multi`, {
    method: "POST",
    body: formData,
  });
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}
