import { Get,Patch } from '@/utils/request.ts'

export const getUserMenu = () => {
  return Get('/blog/menu/user/menus')
}

export const getUserButtons = () => {
  return Get('/blog/menu/user/buttons')
}

export const getUserInfo = (userId: string | number) =>{
  return Get(`/blog/users/${userId}`)
}

export const updateUserInfo = (userId: string | number, data:Record<string, string>) =>{
  return Patch(`/blog/users/${userId}`, data)
}