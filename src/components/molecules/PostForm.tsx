// src/components/molecules/PostForm.tsx
import React, { useState } from "react";
import { createPost } from "../../services/postService";

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createPost({ title, text });
    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Text"
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
