import api from "../api/api";
import { handleError } from "../utils/handleError";
import { Comment } from "../types/types";

export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const createComment = async (commentData: {
  postId: number;
  content: string;
}): Promise<Comment> => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export {};
