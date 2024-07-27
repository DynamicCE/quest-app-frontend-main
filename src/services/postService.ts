import api from "../api/api";
import { handleError } from "../utils/handleError";
import type { Post } from "../types/types";
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    console.log(response.data); // Gelen veriyi kontrol edin
    if (Array.isArray(response.data.data.content)) {
      return response.data.data.content.map((post: Post) => ({
        ...post,
        comments: Array.isArray(post.comments) ? post.comments : [],
      }));
    } else {
      throw new Error("Beklenmeyen veri formatı: Bir dizi bekleniyordu.");
    }
  } catch (error) {
    console.log("catch çalıştı getPosts");
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
