import api from "../api/api";
import { handleError } from "../utils/handleError";

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    console.log(response.data); // Veriyi kontrol edin
    if (Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      throw new Error("Beklenmeyen veri formatı: Bir dizi bekleniyordu.");
    }
  } catch (error) {
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
