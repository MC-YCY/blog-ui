import { User } from '@/types/user.ts'
import { Article } from '@/types/article.ts'

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
  article: Article;
}
