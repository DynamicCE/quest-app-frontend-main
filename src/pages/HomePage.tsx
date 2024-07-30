import React, { useState, useEffect } from "react";
import PostList from "../components/organisms/PostList";
import Button from "../components/atoms/Button";
import PostForm from "../components/molecules/PostForm";
import Navbar from "../components/organisms/Navbar";
import Trending from "../components/molecules/Trending";
import { getPosts } from "../services/postService";
import { Post } from "../types/types";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      setPosts(response.content);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setShowForm(!showForm);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowForm(false);
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <div className="main-content">
          <header className="home-header">
            <h1 className="home-title">QuestApp</h1>
            <div className="create-post-button">
              <Button label="Yeni Post Oluştur" onClick={handleCreatePost} />
            </div>
          </header>
          {showForm && <PostForm onPostCreated={handlePostCreated} />}
          {loading ? (
            <div>Loading posts...</div>
          ) : (
            <PostList posts={posts} onPostUpdated={fetchPosts} />
          )}
        </div>
        <aside className="sidebar">
          <Trending />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
