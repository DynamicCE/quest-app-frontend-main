import api from "../api/api";

export const getTrendingTopics = async (): Promise<string[]> => {
  const response = await api.get("/trending-topics");
  return response.data;
};

export {};
