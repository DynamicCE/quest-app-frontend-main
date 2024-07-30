import React, { useState, useEffect } from "react";
import { getPosts } from "../../services/postService";
import PostItem from "../molecules/PostItem";
import "./PostList.css";
import { Post } from "../../types/types";

const PostList: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getPosts();
        setPostList(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (postList.length === 0) {
    return <div>No posts available.</div>;
  } else {
    return (
      <div className="post-list">
        {postList.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            title={post.title}
            text={post.text}
            author={post.author}
            authorProfilePic={post.authorProfilePic}
            likes={post.likes}
            comments={post.comments || []}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    );
  }
};

export default PostList;
