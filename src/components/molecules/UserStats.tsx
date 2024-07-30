import React, { useState, useEffect } from "react";
import { getUserStats } from "../../services/userService";
import "./UserStats.css";

interface UserStatsProps {
  userId: number;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const userStats = await getUserStats(userId);
        setStats(userStats);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, [userId]);

  return (
    <div className="user-stats">
      <div className="stat">
        <span className="stat-value">{stats.posts}</span>
        <span className="stat-label">Posts</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.followers}</span>
        <span className="stat-label">Followers</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.following}</span>
        <span className="stat-label">Following</span>
      </div>
    </div>
  );
};

export default UserStats;
export {};
