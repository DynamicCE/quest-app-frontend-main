// src/components/molecules/CommentItem.tsx
import React from "react";
import LikeButton from "../atoms/LikeButton";

export interface CommentItemProps {
  id: number;
  author: string;
  content: string;
  authorProfilePic: string;
  likes: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  author,
  content,
  authorProfilePic,
  likes,
}) => {
  return (
    <li className="comment-item">
      <div className="comment-header">
        <img
          src={authorProfilePic}
          alt={`${author}'s profile`}
          className="profile-pic"
        />
        <strong>{author}</strong>
      </div>
      <p>{content}</p>
      <div className="comment-footer">
        <LikeButton itemId={id} isPost={false} />
        <span>{likes} likes</span>
      </div>
    </li>
  );
};

export default CommentItem;
