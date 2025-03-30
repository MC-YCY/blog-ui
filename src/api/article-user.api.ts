import { Get, Post } from '@/utils/request.ts'

export const getArticlesUserInteraction = (articleId: string | number | null, data: { userId: number }) => {
  return Get(`/blog/articles-user/${articleId}/interaction`, data)
}
//切换关注作者
export const toggleArticlesUserFollow = (data: { userId: any, authorId: any }) => {
  return Post(`/blog/articles-user/follow-author`, data)
}
// 切换喜欢文章
export const toggleArticlesUserLike = (data: { userId: any, articleId: any }) => {
  return Post(`/blog/articles-user/like-article`, data)
}
//切换收藏文章
export const toggleArticlesUserFavorite = (data: { userId: any, articleId: any }) => {
  return Post(`/blog/articles-user/favorite-article`, data)
}