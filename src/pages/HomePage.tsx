import React from "react";
import PostList from "../components/organisms/PostList";
import Button from "../components/atoms/Button";

const HomePage: React.FC = () => {
  const handleCreatePost = () => {
    console.log("Yeni Post Oluştur");
  };

  return (
    <div>
      <header>
        <h1>QuestApp</h1>
        <Button label="Yeni Post Oluştur" onClick={handleCreatePost} />
      </header>
      <PostList />
    </div>
  );
};

export default HomePage;
