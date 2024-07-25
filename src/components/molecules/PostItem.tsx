// src/components/molecules/PostItem.tsx
import React from "react";

interface PostProps {
  title: string;
  text: string;
  author: string;
}

const PostItem: React.FC<PostProps> = ({ title, text, author }) => {
  return (
    <div className="post-item">
      <h2>{title}</h2>
      <p>{text}</p>
      <p>Author: {author}</p>
    </div>
  );
};

export default PostItem;
