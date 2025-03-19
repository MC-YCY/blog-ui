import { Get } from '@/utils/request.ts'

export const getUserMenu = () => {
  return Get('/blog/menu/user/menus')
}

export const getUserButtons = () => {
  return Get('/blog/menu/user/buttons')
}