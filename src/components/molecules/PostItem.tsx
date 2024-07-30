import React, { useState } from "react";
import { format } from "date-fns";
import { likePost, sharePost, savePost } from "../../services/postService";
import CommentForm from "../molecules/CommentForm";
import "./PostItem.css";
import { Comment, Post, User } from "../../types/types";

interface PostItemProps {
  post: Post;
  onPostUpdated: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onPostUpdated }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const formattedDate = format(new Date(post.createdAt), "dd/MM/yyyy HH:mm");

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      onPostUpdated();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
      alert("Post shared successfully!");
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleSave = async () => {
    try {
      await savePost(post.id);
      alert("Post saved successfully!");
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCommentSubmit = (comment: string) => {
    // Implement comment submission logic
    console.log("Comment submitted:", comment);
    setShowCommentForm(false);
    onPostUpdated();
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="post-author">
          <img
            src={post.user.profilePicture || "/default-avatar.png"}
            alt={`${post.user.username}'s profile`}
            className="profile-pic"
          />
          <span>{post.user.username}</span>
        </div>
        <span className="post-date">{formattedDate}</span>
      </div>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.text}</p>
      <div className="post-actions">
        <button
          className={`action-button ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <i className={`${isLiked ? "fas" : "far"} fa-heart`}></i>
          {likeCount > 0 && <span className="like-count">{likeCount}</span>}
        </button>
        <button
          className="action-button"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <i className="far fa-comment"></i>
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </button>
        <button className="action-button" onClick={handleShare}>
          <i className="far fa-paper-plane"></i>
        </button>
        <button className="action-button" onClick={handleSave}>
          <i className="far fa-bookmark"></i>
        </button>
      </div>
      {showCommentForm && (
        <CommentForm postId={post.id} onCommentSubmit={handleCommentSubmit} />
      )}
    </div>
  );
};

export default PostItem;
