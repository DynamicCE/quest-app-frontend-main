import React from "react";
import { Comment } from "../../types/types";
import "./CommentList.css";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>Henüz yorum yok.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <strong>{comment.author}</strong>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
