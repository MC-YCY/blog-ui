import { Get, Post } from '@/utils/request.ts'

export const uploadUserImages = (userId: string, data: FormData) => {
  return Post(`/blog/images/upload/${userId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getUserImages = (userId: string, data: any) => {
  return Get(`/blog/images/${userId}`, data)
}