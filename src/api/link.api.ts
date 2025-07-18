import { Post, Get } from '@/utils/request.ts'
import { LinkType } from '@/types/link.ts'

export const createLink = (data: LinkType) => {
  return Post('/blog/links', data)
}

export const getLinkList = () => {
  return Get(`/blog/links`)
}