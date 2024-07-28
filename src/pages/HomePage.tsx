import React, { useState } from "react";
import PostList from "../components/organisms/PostList";
import Button from "../components/atoms/Button";
import PostForm from "../components/molecules/PostForm";
import Navbar from "../components/organisms/Navbar";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="home-page">
      <Navbar />
      <header className="home-header">
        <h1 className="home-title">QuestApp</h1>
        <Button label="Yeni Post Oluştur" onClick={handleCreatePost} />
      </header>
      {showForm && <PostForm />}
      <PostList />
    </div>
  );
};

export default HomePage;
