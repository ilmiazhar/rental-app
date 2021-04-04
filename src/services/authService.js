import http from "./httpService";
import decoder from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getToken());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return decoder(jwt);
  } catch (error) {
    return null;
  }
}

export function jwtLogin(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  jwtLogin,
  getCurrentUser,
};
