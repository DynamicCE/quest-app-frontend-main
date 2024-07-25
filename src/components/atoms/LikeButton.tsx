import React from "react";
import { likePost, likeComment } from "../../services/likeService";

interface LikeButtonProps {
  itemId: number;
  isPost: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ itemId, isPost }) => {
  const handleLike = async () => {
    try {
      if (isPost) {
        await likePost(itemId);
      } else {
        await likeComment(itemId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLike}>Like</button>;
};

export default LikeButton;
