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
//获取文章状态，作者粉丝，文章收藏数量，文章喜欢数量，文章浏览量
export const getArticlesStats = (data: { articleId: any }) => {
  return Post(`/blog/articles-user/stats-article`, data)
}