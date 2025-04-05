import { Get, Del, Post, Put } from '@/utils/request.ts'
import { ArticleStatus } from '@/types/enums/article-status.enum.ts'

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

export const createUserArticle = (userId: string | number, data: CreateArticleDto) => {
  return Post(`/blog/articles/${userId}`, data)
}

export const userArticleList = (userId: string | number | null, data: PaginateArticleDto) => {
  return Get(`/blog/articles/user/${userId}`, data)
}

export const updateUserArticle = (userId: string | number, data: CreateArticleDto) => {
  return Put(`/blog/articles/${userId}`, data)
}

export const allArticlesList = (data: PaginateArticleDto) => {
  return Get(`/blog/articles/all`, data)
}

export const userDeleteArticle = (userId: string | number, data: { articleId: number }) => {
  return Del(`/blog/articles/${userId}`, data)
}

export const getArticle = (articleId: number | string | null) => {
  return Get(`/blog/articles/item/${articleId}`)
}

export const getTimelineArticles = () => {
  return Get(`/blog/articles/timeline`)
}