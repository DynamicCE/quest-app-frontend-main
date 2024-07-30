import React from "react";
import PostItem from "../molecules/PostItem";
import { Post } from "../../types/types";

interface PostListProps {
  posts: Post[];
  onPostUpdated: () => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onPostUpdated }) => {
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onPostUpdated={onPostUpdated} />
      ))}
    </div>
  );
};
export default PostList;
