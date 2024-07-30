import React, { useState } from "react";
import { createPost } from "../../services/postService";
import { Post } from "../../types/types";
import "./PostForm.css";

interface PostFormProps {
  onPostCreated: (newPost: Post) => void;
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const newPost = await createPost({ title, text });
      onPostCreated(newPost);
      setTitle("");
      setText("");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        "Gönderi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>Yeni Gönderi Oluştur</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Gönderi içeriği"
        required
      ></textarea>
      <div className="form-actions">
        <button type="submit">Gönder</button>
        <button type="button" onClick={onClose}>
          İptal
        </button>
      </div>
    </form>
  );
};

export default PostForm;
