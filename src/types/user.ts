import { Article } from "./article";
import { Role } from "./role";
import { Image } from '@/types/image.ts'
import { Favorite } from '@/types/favorite.ts'

export interface User {
  id: number;
  account: string;
  username: string;
  password: string;
  avatar: string;
  signature: string;
  changeLog: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: Role;
  articles?: Article[];
  likedArticles?: Article[];
  comments?: Comment[];
  images?: Image[];
  favorites?: Favorite[];
  following?: User[];
  followers?: User[];
  color?: string;
  followersCount?: number;
  followingCount?: number;
  totalArticles?: number;
}
