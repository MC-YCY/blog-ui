import { User } from "./user";
import { ArticleStatus } from '@/types/enums/article-status.enum.ts'
import {Comment} from './comment.ts'
import { Favorite } from '@/types/favorite.ts'

export interface Article {
  id: number;
  title: string;
  content: string;
  tags: Array<string>;
  readme: string;
  banner: string;
  createdAt: Date;
  viewCount: number;
  author: User;
  likedBy: User[];
  comments: Comment[];
  favorites: Favorite[];
  status: ArticleStatus;
  likeCount: number;
}
