import React, { useState } from "react";
import { format } from "date-fns";
import { likePost, sharePost, savePost } from "../../services/postService";
import { getComments, createComment } from "../../services/commentService";
import CommentForm from "../molecules/CommentForm";
import CommentList from "../organisms/CommentList";
import "./PostItem.css";
import { Comment, Post } from "../../types/types";

interface PostItemProps {
  post: Post;
  onPostUpdated: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onPostUpdated }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const formattedDate = format(new Date(post.createdAt), "dd/MM/yyyy HH:mm");

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setIsLiked(!isLiked);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
      showNotification("Post başarıyla paylaşıldı!");
    } catch (error) {
      console.error("Error sharing post:", error);
      showNotification("Post paylaşılırken bir hata oluştu.");
    }
  };

  const handleSave = async () => {
    try {
      await savePost(post.id);
      showNotification("Post başarıyla kaydedildi!");
    } catch (error) {
      console.error("Error saving post:", error);
      showNotification("Post kaydedilirken bir hata oluştu.");
    }
  };

  const handleCommentClick = async () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      setIsLoadingComments(true);
      try {
        const fetchedComments = await getComments(post.id);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
        showNotification("Yorumlar yüklenirken bir hata oluştu.");
      } finally {
        setIsLoadingComments(false);
      }
    }
  };

  const handleCommentSubmit = async (comment: Comment) => {
    try {
      await createComment({ postId: post.id, content: comment.content });
      const updatedComments = await getComments(post.id);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error adding comment:", error);
      showNotification("Yorum eklenirken bir hata oluştu.");
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
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
        <button className="action-button" onClick={handleCommentClick}>
          <i className="far fa-comment"></i>
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </button>
        <button className="action-button" onClick={handleShare}>
          <i className="far fa-paper-plane"></i>
        </button>
        <button className="action-button" onClick={handleSave}>
          <i className="far fa-bookmark"></i>
        </button>
      </div>
      {showComments && (
        <div className="comments-section">
          {isLoadingComments ? (
            <p>Yorumlar yükleniyor...</p>
          ) : (
            <>
              <CommentList comments={comments} />
              <CommentForm
                postId={post.id}
                onCommentSubmit={handleCommentSubmit}
              />
            </>
          )}
        </div>
      )}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
};

export default PostItem;
