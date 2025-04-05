import { Article } from '@/types/article.ts'
import { User } from './user';

export interface Favorite {
  id: number;
  user: User;
  article: Article;
  createdAt: Date; // 收藏时间
}
