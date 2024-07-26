// src/pages/HomePage.tsx
import React, { useState } from "react";
import PostList from "../components/organisms/PostList";
import Button from "../components/atoms/Button";
import PostForm from "../components/molecules/PostForm";

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = () => {
    setShowForm(true);
  };

  return (
    <div>
      <header>
        <h1>QuestApp</h1>
        <Button label="Yeni Post Oluştur" onClick={handleCreatePost} />
      </header>
      {showForm && <PostForm />}
      <PostList />
    </div>
  );
};

export default HomePage;
