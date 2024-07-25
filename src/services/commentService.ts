import api from "../api/api";
import { handleError } from "../utils/handleError";

export const getComments = async (postId: number) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export {};
