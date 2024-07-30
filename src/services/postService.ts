import api from "../api/api";
import { handleError } from "../utils/handleError";
import type { Post, PagedResult } from "../types/types";

export const getPosts = async (): Promise<PagedResult<Post>> => {
  try {
    const response = await api.get("/posts");
    if (Array.isArray(response.data.data.content)) {
      return {
        items: [],
        content: response.data.data.content.map((post: any) => ({
          ...post,
          user: post.user || { username: "Anonymous" },
          comments: Array.isArray(post.comments) ? post.comments : [],
          createdAt: post.createdAt || new Date().toISOString(),
        })),
        totalPages: response.data.data.totalPages || 0,
        totalElements: response.data.data.totalElements || 0,
        size: response.data.data.size || 0, // Add this line
        number: response.data.data.number || 0, // Add this line
      };
    } else {
      return {
        items: [],
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 0, // Add this line
        number: 0, // Add this line
      };
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(handleError(error));
  }
};

export const createPost = async (postData: { title: string; text: string }) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    throw new Error(handleError(error));
  }
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
