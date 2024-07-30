import React, { useState } from "react";
import { format } from "date-fns";
import "./PostItem.css";
import { Comment, Post } from "../../types/types";

const PostItem: React.FC<Post> = ({
  id,
  title,
  text,
  user, // 'author' yerine 'user' kullanıyoruz
  likes,
  comments,
  createdAt,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd/MM/yyyy HH:mm")
    : "Invalid date";

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="post-author">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={`${user.username}'s profile`}
              className="profile-pic"
            />
          ) : (
            <div className="profile-placeholder">
              {user.username ? user.username.charAt(0) : "A"}
            </div>
          )}
          <span>{user.username || "Anonymous"}</span>
        </div>
        <span className="post-date">{formattedDate}</span>
      </div>
      <h2 className="post-title">{title}</h2>
      <p className="post-content">{text}</p>
      {/* Diğer kısımlar aynı kalabilir */}
    </div>
  );
};

export default PostItem;
