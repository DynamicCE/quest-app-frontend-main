import api from "../api/api";
import { handleError } from "../utils/handleError";
import { Comment } from "../types/types";

export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.content)
    ) {
      return response.data.data.content.map((comment: any) => ({
        ...comment,
        user: comment.user || { username: "Anonymous" },
        createdAt: comment.createdAt || new Date().toISOString(),
      }));
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(handleError(error));
  }
};

export const createComment = async (commentData: {
  postId: number;
  content: string;
}): Promise<Comment> => {
  try {
    const response = await api.post(
      `/posts/${commentData.postId}/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error(handleError(error));
  }
};
export {};
