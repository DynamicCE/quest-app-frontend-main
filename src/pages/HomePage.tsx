import React, { useState, useEffect } from "react";
import PostList from "../components/organisms/PostList";
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
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPosts();
      setPosts(response.content);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(
        "Gönderiler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setShowForm(true);
    setSuccessMessage(null);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setShowForm(false);
    setSuccessMessage("Gönderi başarıyla oluşturuldu!");
    setTimeout(() => setSuccessMessage(null), 3000); // 3 saniye sonra mesajı kaldır
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowForm(false);
    }
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <div className="main-content">
          <h1 className="home-title">QuestApp</h1>
          <button className="create-post-button" onClick={handleCreatePost}>
            Yeni Post Oluştur
          </button>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {loading ? (
            <div className="loading">Gönderiler yükleniyor...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <PostList posts={posts} onPostUpdated={fetchPosts} />
          )}
        </div>
        <aside className="sidebar">
          <Trending />
        </aside>
      </div>
      {showForm && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <PostForm
              onPostCreated={handlePostCreated}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
