import React from "react";
import CommentList from "./CommentList";
import LikeButton from "../atoms/LikeButton";
import "./PostItem.css";

interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  author: string;
  content: string;
  authorProfilePic: string;
  likes: number;
}

interface PostProps {
  id: number;
  title: string;
  text: string;
  author: string;
  authorProfilePic: string;
  likes: number;
  comments: Comment[];
}

const PostItem: React.FC<PostProps> = ({
  id,
  title,
  text,
  author,
  authorProfilePic,
  likes,
  comments,
}) => {
  return (
    <div className="post-item">
      <div className="post-header">
        {authorProfilePic ? (
          <img
            src={authorProfilePic}
            alt={`${author}'s profile`}
            className="profile-pic"
          />
        ) : (
          <span className="profile-placeholder">undefined's profile</span>
        )}
        <h2>{title}</h2>
        {author ? (
          <p className="post-author">Author: {author}</p>
        ) : (
          <span className="author-placeholder">Author: undefined</span>
        )}
      </div>
      <p className="post-content">{text}</p>
      <div className="post-footer">
        <LikeButton itemId={id} isPost={true} />
        <div className="post-actions">
          <button className="action-button like-button">
            <i className="fa fa-heart"></i>
          </button>
          <button className="action-button comment-button">
            <i className="fa fa-comment"></i>
          </button>
          <button className="action-button share-button">
            <i className="fa fa-paper-plane"></i>
          </button>
          <button className="action-button save-button">
            <i className="fa fa-bookmark"></i>
          </button>
        </div>
      </div>
      <CommentList comments={comments || []} />
    </div>
  );
};

export default PostItem;
