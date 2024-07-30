import React, { useState } from "react";
import { createComment } from "../../services/commentService";
import { Comment } from "../../types/types";

interface CommentFormProps {
  postId: number;
  onCommentSubmit: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onCommentSubmit,
}) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newComment = await createComment({ postId, content });
      onCommentSubmit(newComment);
      setContent("");
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      {error && <div className="error-message">{error}</div>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Yorum ekle"
        required
      ></textarea>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default CommentForm;
