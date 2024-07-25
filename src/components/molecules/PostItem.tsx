import React from "react";
import CommentList from "../organisms/CommentList";

interface PostProps {
  id: number;
  title: string;
  text: string;
  author: string;
}

const PostItem: React.FC<PostProps> = ({ id, title, text, author }) => {
  return (
    <div className="post-item">
      <h2>{title}</h2>
      <p>{text}</p>
      <p>Author: {author}</p>
      <CommentList postId={id} />
    </div>
  );
};

export default PostItem;
