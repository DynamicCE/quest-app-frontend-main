import React from "react";
import CommentItem from "../molecules/CommentItem";

interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
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
        comments.map((comment) => <CommentItem key={comment.id} {...comment} />)
      )}
    </div>
  );
};

export default CommentList;
