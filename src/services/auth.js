import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth"
    : "/auth";

const authService = axios.create({
  baseURL,
  withCredentials: true,
});

export const signupFn = (userInfo) => authService.post("/signup", userInfo);
export const loginFn = (userInfo) => authService.post("/login", userInfo);
export const currentUserFn = () => authService.get("/current-user");
export const logoutFn = () => authService.get("/logout");
