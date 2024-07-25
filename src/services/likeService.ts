import api from "../api/api";
import { handleError } from "../utils/handleError";

export const likePost = async (postId: number) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const likeComment = async (commentId: number) => {
  try {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
