import api from "./api";
import tokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;
const register = async (username, name, email, password) => {
  return api.post(`${API_URL}/signup`, { username, name, email, password });
};

const login = async (username, password) => {
  const response = await api.post(`${API_URL}/signin`, { username, password });

  if (!response.data.token) return response;

  tokenService.setUser(response.data);
  return response;
};

const logout = () => {
  tokenService.removeUser();
};

const AuthService = { register, login, logout };

export default AuthService;
