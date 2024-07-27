import React from "react";
import CommentItem from "./CommentItem";

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

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!Array.isArray(comments)) {
    return <div>Yorumlar yüklenirken bir hata oluştu.</div>;
  }

  return (
    <div>
      {comments.length === 0 ? (
        <div>No comments available.</div>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            author={comment.author}
            content={comment.content}
            authorProfilePic={comment.authorProfilePic}
            likes={comment.likes}
          />
        ))
      )}
    </div>
  );
};

export default CommentList;
