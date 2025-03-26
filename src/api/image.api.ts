import { Get, Post, Del } from '@/utils/request.ts'

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

export const deleteUserImage = (userId: string | number, id: string | number) => {
  return Del(`/blog/images/${userId}`, {id})
}