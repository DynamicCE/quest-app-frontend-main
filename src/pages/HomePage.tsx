import React, { useState } from "react";
import PostList from "../components/organisms/PostList";
import Button from "../components/atoms/Button";
import PostForm from "../components/molecules/PostForm";
import Navbar from "../components/organisms/Navbar"; // Navbar bileşeni eklendi

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Navbar />
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
