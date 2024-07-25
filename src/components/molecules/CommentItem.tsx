import React from "react";

interface CommentProps {
  author: string;
  content: string;
}

const CommentItem: React.FC<CommentProps> = ({ author, content }) => {
  return (
    <div className="comment-item">
      <p>
        <strong>{author}:</strong> {content}
      </p>
    </div>
  );
};

export default CommentItem;
