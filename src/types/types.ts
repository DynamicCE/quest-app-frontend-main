// src/types/types.ts

export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  author: string;
  content: string;
  authorProfilePic: string;
  likes: number;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  author: string;
  authorProfilePic: string;
  likes: number;
  comments: Comment[];
}
