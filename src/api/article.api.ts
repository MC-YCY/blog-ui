import { Get, Del, Post, Put } from '@/utils/request.ts'
import { CreateArticleDto, PaginateArticleDto } from '@/types/article.ts'

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