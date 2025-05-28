import { User } from "./user";
import { ArticleStatus } from '@/types/enums/article-status.enum.ts'
import {BaseComment} from './comment.ts'
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
  comments: BaseComment[];
  favorites: Favorite[];
  status: ArticleStatus;
  likeCount: number;
}
export interface CreateArticleDto {
  readonly title: string;
  readonly content: string;
  status?: ArticleStatus; // 允许创建时指定状态（默认DRAFT）
  tags: string[];
  readme: string;
  banner: string;
  articleId?: number;
}

export class PaginateArticleDto {
  page?: number = 1
  limit?: number = 10
  status?: ArticleStatus // 增加状态过滤
  tag?: string
  title?: string
}

export interface ArticleItem {
  title: string;
  content: string;
  status?: ArticleStatus; // 允许创建时指定状态（默认DRAFT）
  tags: string[];
  readme: string;
  banner: string;
  id: number;
  createdAt: string
  viewCount:number
}

export interface ArticleType extends Article{
}