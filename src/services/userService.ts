// src/services/userService.ts
import api from "../api/api";
import { handleError } from "../utils/handleError";

export const registerUser = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const loginUser = async (userData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/users/login", userData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export {};
