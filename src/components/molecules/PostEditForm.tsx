// src/components/molecules/PostEditForm.tsx
import React, { useState, useEffect } from "react";
import { getPostById, updatePost } from "../../services/postService";

interface PostEditFormProps {
  postId: number;
}

const PostEditForm: React.FC<PostEditFormProps> = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(postId);
        setTitle(post.title);
        setText(post.text);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updatePost({ postId, title, text });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
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
      <button type="submit">Update Post</button>
    </form>
  );
};

export default PostEditForm;
