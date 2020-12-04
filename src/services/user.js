import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/user"
    : "/api/user";

const userService = axios.create({
  baseURL,
  withCredentials: true,
});

export const editUserFn = (userInfo) => userService.put("/edit", userInfo);
