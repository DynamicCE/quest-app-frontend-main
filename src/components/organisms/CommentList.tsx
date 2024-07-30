import React from "react";
import { Comment } from "../../types/types";
import "./CommentList.css";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!Array.isArray(comments)) {
    console.error("comments prop is not an array", comments);
    return <p>Yorumlar yüklenemedi.</p>;
  }

  if (comments.length === 0) {
    return <p>Henüz yorum yok.</p>;
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          {/* Yorum içeriği */}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
