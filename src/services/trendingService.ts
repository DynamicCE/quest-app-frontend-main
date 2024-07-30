import api from "../api/api";

export const getTrendingTopics = async (): Promise<string[]> => {
  try {
    const response = await api.get("/trending-topics");
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error(
        "Unexpected response format for trending topics:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching trending topics:", error);
    return [];
  }
};
