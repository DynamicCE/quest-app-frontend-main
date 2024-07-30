export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  author: string;
  content: string;
  authorProfilePic: string;
  likes: number;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  author: string;
  authorProfilePic: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt: string;
}
