import api from "../api/api";
import { handleError } from "../utils/handleError";
import { Comment } from "../types/types";

export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    if (Array.isArray(response.data)) {
      return response.data.map((comment: any) => ({
        ...comment,
        user: comment.user || { username: "Anonymous" }, // 'user' alanını kullanıyoruz
        createdAt: comment.createdAt || new Date().toISOString(), // 'createdAt' alanını ISO string formatında sağlıyoruz
      }));
    } else {
      throw new Error("Beklenmeyen veri formatı: Bir dizi bekleniyordu.");
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
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export {};
