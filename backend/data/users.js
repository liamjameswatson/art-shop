import bcrypt from "bcryptjs";

export const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "admin",
  },
  {
    name: "James Doe",
    email: "james@example.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "user",
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("test1234", 10),
    role: "user",
  },
];
