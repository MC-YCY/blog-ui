import { Get, Del, Post, Put } from '@/utils/request.ts'

export enum ArticleStatus {
  DRAFT = 'draft', // 草稿
  PUBLISHED = 'published', // 已发布
  PENDING_REVIEW = 'pending_review', // 待审核
  REJECTED = 'rejected', // 已驳回
}

export interface CreateArticleDto {
  readonly title: string;
  readonly content: string;
  status?: ArticleStatus; // 允许创建时指定状态（默认DRAFT）
  tags: string[];
  readme: string;
  banner: string;
}

export class PaginateArticleDto {
  page?: number = 1
  limit?: number = 10
  status?: ArticleStatus // 增加状态过滤
  tag?: string
  title?: string
}

interface UpdateArticleDto {
  title?: string;
  content?: string;
  articleId: number;
  status?: ArticleStatus; // 允许创建时指定状态（默认DRAFT）
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
}

export const createUserArticle = (userId: string | number, data: CreateArticleDto) => {
  return Post(`/blog/articles/${userId}`, data)
}

export const userArticleList = (userId: string | number, data: PaginateArticleDto) => {
  return Get(`/blog/articles/user/${userId}`, data)
}

export const updateUserArticle = (userId: string | number, data: UpdateArticleDto) => {
  return Put(`/blog/articles/${userId}`, data)
}

export const allArticlesList = (data: PaginateArticleDto) => {
  return Get(`/blog/articles/all`, data)
}

export const userDeleteArticle = (userId: string | number, data: { articleId: number }) => {
  return Del(`/blog/articles/${userId}`, data)
}