// src/components/molecules/Trending.tsx
import React, { useState, useEffect } from "react";
import { getTrendingTopics } from "../../services/trendingService";
import "./Trending.css";

const Trending: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        let trendingTopics = await getTrendingTopics();
        // Dizi olup olmadığını kontrol et
        if (!Array.isArray(trendingTopics)) {
          console.error("Trending topics is not an array:", trendingTopics);
          trendingTopics = [];
        }
        setTopics(trendingTopics);
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        setError("Trending konular yüklenemedi.");
      }
    };

    fetchTrendingTopics();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="trending">
      <h2>Trending Topics</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default Trending;
