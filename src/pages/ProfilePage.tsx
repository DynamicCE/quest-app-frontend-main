import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, getUserStats } from "../services/userService";
import { getPostsByUserId } from "../services/postService";
import PostList from "../components/organisms/PostList";
import Navbar from "../components/organisms/Navbar";
import UserStats from "../components/molecules/UserStats";
import { Post, User } from "../types/types";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const userData = await getUserById(parseInt(userId));
          setUser(userData);
          const userPosts = await getPostsByUserId(parseInt(userId));
          setPosts(userPosts);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handlePostUpdated = () => {
    // Implement post update logic if needed
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="not-found">User not found</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt={user.username}
            className="profile-picture"
          />
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="bio">{user.bio || "No bio available"}</p>
            <p className="join-date">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <UserStats userId={user.id} />
        <h2>Posts</h2>
        <PostList posts={posts} onPostUpdated={handlePostUpdated} />
      </div>
    </div>
  );
};

export default ProfilePage;
