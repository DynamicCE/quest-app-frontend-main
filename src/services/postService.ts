import api from "../api/api";
import { handleError } from "../utils/handleError";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
