import React from "react";
import CommentList from "../organisms/CommentList";
import LikeButton from "../atoms/LikeButton";
import "./PostItem.css"; // CSS dosyasını dahil edin

export interface PostProps {
  id: number;
  title: string;
  text: string;
  author: string;
  authorProfilePic: string;
  likes: number;
}

const PostItem: React.FC<PostProps> = ({
  id,
  title,
  text,
  author,
  authorProfilePic,
  likes,
}) => {
  console.log(Comment);
  return (
    <div className="post-item">
      <div className="post-header">
        <img
          src={authorProfilePic}
          alt={`${author}'s profile`}
          className="profile-pic"
        />
        <h2>{title}</h2>
        <p>Author: {author}</p>
      </div>
      <p>{text}</p>
      <div className="post-footer">
        <LikeButton itemId={id} isPost={true} />
        <span>{likes} likes</span>
      </div>
      <CommentList postId={id} />
    </div>
  );
};

export default PostItem;
