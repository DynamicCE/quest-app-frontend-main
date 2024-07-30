import React, { useState, useEffect } from "react";
import { getTrendingTopics } from "../../services/trendingService";
import "./Trending.css";

const Trending: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const trendingTopics = await getTrendingTopics();

        if (Array.isArray(trendingTopics)) {
          setTopics(trendingTopics);
        } else {
          console.error("Trending topics is not an array:", trendingTopics);

          setTopics([]);
        }
      } catch (error) {
        console.error("Error fetching trending topics:", error);
        setTopics([]);
      }
    };

    fetchTrendingTopics();
  }, []);

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
