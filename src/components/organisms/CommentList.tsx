import React, { useState, useEffect } from "react";
import { getComments } from "../../services/commentService";
import "./CommentList.css";
interface Comment {
  author: string;
  content: string;
}

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
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
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    );
  }
};

export default CommentList;

export {};
