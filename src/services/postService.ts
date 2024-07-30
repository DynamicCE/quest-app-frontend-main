import api from "../api/api";
import { handleError } from "../utils/handleError";
import type { Post, PagedResult } from "../types/types";

export const getPosts = async (): Promise<PagedResult<Post>> => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (postData: {
  title: string;
  text: string;
}): Promise<Post> => {
  const response = await api.post("/posts", postData);
  return response.data;
};

export const getPostById = async (postId: number) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const updatePost = async (postData: {
  postId: number;
  title: string;
  text: string;
}) => {
  try {
    const response = await api.put(`/posts/${postData.postId}`, postData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data.data.content.map((post: Post) => ({
      ...post,
      comments: Array.isArray(post.comments) ? post.comments : [],
      createdAt: post.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    throw new Error(handleError(error));
  }
};
export const likePost = async (postId: number): Promise<void> => {
  await api.post(`/posts/${postId}/like`);
};

export const sharePost = async (postId: number): Promise<void> => {
  await api.post(`/posts/${postId}/share`);
};

export const savePost = async (postId: number): Promise<void> => {
  await api.post(`/posts/${postId}/save`);
};
export {};
