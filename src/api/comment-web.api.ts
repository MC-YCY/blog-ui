import { Post, Get } from '@/utils/request.ts'
import { CreateCommentWebDto } from '@/types/comment-web.ts'

export const createCommentsWebApi = (data: CreateCommentWebDto) => {
  return Post('/blog/comments-web', data)
}

export const getCommentsWebApi = (params: { page: number, limit: number }) => {
  return Get(`/blog/comments-web`, params)
}