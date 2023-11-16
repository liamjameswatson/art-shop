import { USERS_URL } from "../constants";

export async function getAllUsers() {
  const response = await fetch(`${USERS_URL}`);
  if (response.error) {
    throw new Error(response.error.message || response.error);
  }
  return response.json();
}

export async function login({ email, password }) {
  const response = await fetch(`${USERS_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 201) {
    throw new Error(response.message || response.error);
  }
  // Parse the JSON response
  const data = await response.json();
  return data;
}

export async function getCurrentUserInfo() {
  const response = await fetch(`${USERS_URL}/profile2`);
  const data = await response.json();

  return data.user;
}

export async function logout() {
  const response = await fetch(`${USERS_URL}/logoutUser`, {
    method: "POST",
  });
  console.log(response);
}

export async function createUser({ email, password, name }) {
  const response = await fetch(`${USERS_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
  console.log("signedup", response);
  if (response.status !== 201) {
    throw new Error(response.message || response.error);
  }
  // Parse the JSON response
  const data = await response.json();
  return data;
}

export async function editUserProfile(data) {
  const { name, email, password } = data;
  const response = await fetch(`${USERS_URL}/profile2`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  console.log(response);
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${USERS_URL}/profile2`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToDelete: id }),
  });
  console.log(response);
  return response.json();
}

export async function deleteCurrentUser() {
  const response = await fetch(`${USERS_URL}/deleteMe`, {
    method: "DELETE",
  });
  console.log(response);
}

// import { USERS_URL } from "../constants";
// import { apiSlice } from "./apiSlice";
// apiSlice is for async requests that create endpoints

// profile: builder.mutation({
//   query: (data) => ({
//     url: `${USERS_URL}/profile`,
//     method: "PUT",
//     body: data,
//   }),
// }),
// getUsers: builder.query({
//   query: () => ({
//     url: `${USERS_URL}`,
//     method: "GET",
//   }),
//   providesTags: ["Users"], // refresh the cache
//   keepUnusedDataFor: 5,
// }),
// deleteUser: builder.mutation({
//   query: (userId) => ({
//     url: `${USERS_URL}/${userId}`,
//     method: "DELETE",
//   }),
// }),
// getUserDetails: builder.query({
//   query: (userId) => ({
//     url: `${USERS_URL}/${userId}`,
//   }),
//   keepUnusedDataFor: 5,
// }),
// updateUser: builder.mutation({
//   query: (data) => ({
//     url: `${USERS_URL}/${data.userId}`,
//     method: "PUT",
//     body: data,
//   }),
//   invalidatesTags: ["Users"],
// })
