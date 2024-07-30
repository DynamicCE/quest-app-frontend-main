import api from "../api/api";
import { handleError } from "../utils/handleError";
import { Comment } from "../types/types";

export const getComments = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.map(
      (comment: any): Comment => ({
        id: comment.id,
        text: comment.text,
        userId: comment.userId,
        postId: comment.postId,
        author: comment.author,
        content: comment.content,
        profilePicture: comment.profilePicture,
        likes: comment.likes,
        createdAt: comment.createdAt,
      })
    );
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const createComment = async (commentData: {
  postId: number;
  content: string;
}) => {
  try {
    const response = await api.post("/comments", commentData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
