import React from "react";

interface CommentItemProps {
  author: string;
  content: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content }) => {
  return (
    <li>
      <strong>{author}:</strong> {content}
    </li>
  );
};

export default CommentItem;
