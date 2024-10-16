export interface Comment {
  id: number;
  text: string;
  userId: number;
  postId: number;
  author: string;
  content: string;
  profilePicture?: string;
  likes: number;
  createdAt: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;
  text: string;
  user: User;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface PagedResult<T> {
  items: Post[];
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
