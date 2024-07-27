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
  console.log(comments);

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
      <CommentList comments={comments || []} />{" "}
    </div>
  );
};

export default PostItem;
