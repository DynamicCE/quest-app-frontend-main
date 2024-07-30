import React, { useState, useEffect } from "react";
import { getComments } from "../../services/commentService";
import "./CommentList.css";
import { Comment } from "../../types/types";

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
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <div className="comment-header">
              <img
                src={comment.profilePicture || "/default-avatar.png"}
                alt={`${comment.author}'s profile`}
                className="profile-pic"
              />
              <strong>{comment.author}</strong>
            </div>
            <p className="comment-content">{comment.content}</p>
          </li>
        ))}
      </ul>
    );
  }
};

export default CommentList;
