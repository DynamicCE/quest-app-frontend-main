// src/components/molecules/CommentList.tsx
import React, { useState, useEffect } from "react";
import { getComments } from "../../services/commentService";
import CommentItem, { CommentItemProps } from "./CommentItem";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentItemProps[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getComments(postId);
        setComments(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchComments();
  }, [postId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            author={comment.author}
            content={comment.content}
            authorProfilePic={comment.authorProfilePic}
            likes={comment.likes}
          />
        ))}
      </ul>
    );
  }
};

export default CommentList;
