import httpService from "./httpService";
import jwtDecode from "jwt-decode";
import http from "./httpService";

export const roleCustomer = "User";
export const roleSeller = "Seller";

export interface DecodeUser {
  email: string;
  unique_name: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
}

export interface UserRegister {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  returnUrl: string;
}

const apiEndpoint = "user";
const jwtKeyName = "jwt";
const userIdKeyName = "userId";

const jwt = getJwt();
http.setJwtHeader(jwt !== null ? jwt : "");

export async function login(email: string, password: string) {
  const { data } = await httpService.post(apiEndpoint + "/login", {
    email,
    password,
  });

  if (data.roleName === "Admin") return null;

  localStorage.setItem(jwtKeyName, data.token);
  localStorage.setItem(userIdKeyName, data.id);
  http.setJwtHeader(data.token);

  return data.token;
}

export async function register(user: UserRegister) {
  const response = await httpService.post(apiEndpoint + "/register", user);

  return response;
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(jwtKeyName, jwt);
}

export function logout() {
  localStorage.removeItem(jwtKeyName);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(jwtKeyName);

    if (jwt) {
      const user: DecodeUser = jwtDecode(jwt);
      return user;
    }
  } catch (ex) {
    return null;
  }

  return null;
}

export function getUserId() {
  const userId = localStorage.getItem(userIdKeyName);
  return userId;
}

export function getJwt() {
  const jwt = localStorage.getItem(jwtKeyName);
  return jwt;
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default auth;
