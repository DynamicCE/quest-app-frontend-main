import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";
import { getPostsByUserId } from "../services/postService";
import PostList from "../components/organisms/PostList";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userData = await getUserById(parseInt(userId));
        setUser(userData);
        const userPosts = await getPostsByUserId(parseInt(userId));
        setPosts(userPosts);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.profilePicture || "default-avatar.png"}
          alt={user.username}
          className="profile-picture"
        />
        <h1>{user.username}</h1>
        <p>{user.bio}</p>
      </div>
      <div className="profile-stats">
        <div>Posts: {posts.length}</div>
        <div>Followers: {user.followers}</div>
        <div>Following: {user.following}</div>
      </div>
      <h2>Posts</h2>
      <PostList posts={posts} />
    </div>
  );
};

export default ProfilePage;
