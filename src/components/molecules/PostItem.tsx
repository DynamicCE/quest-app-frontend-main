import React, { useState } from "react";
import { format } from "date-fns";
import "./PostItem.css";
import { Comment } from "../../types/types";

interface PostProps {
  id: number;
  title: string;
  text: string;
  author?: string;
  authorProfilePic?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

const PostItem: React.FC<PostProps> = ({
  id,
  title,
  text,
  author,
  authorProfilePic,
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
          {authorProfilePic ? (
            <img
              src={authorProfilePic}
              alt={`${author || "Anonymous"}'s profile`}
              className="profile-pic"
            />
          ) : (
            <div className="profile-placeholder">
              {author ? author.charAt(0) : "A"}
            </div>
          )}
          <span>{author || "Anonymous"}</span>
        </div>
        <span className="post-date">{formattedDate}</span>
      </div>
      <h2 className="post-title">{title}</h2>
      <p className="post-content">{text}</p>
      <div className="post-actions">
        <button
          className={`action-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <i className={`${isLiked ? "fas" : "far"} fa-heart`}></i>
          {likeCount > 0 && <span className="like-count">{likeCount}</span>}
        </button>
        <button className="action-button">
          <i className="far fa-comment"></i>
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </button>
        <button className="action-button">
          <i className="far fa-paper-plane"></i>
        </button>
        <button className="action-button">
          <i className="far fa-bookmark"></i>
        </button>
      </div>
    </div>
  );
};

export default PostItem;
