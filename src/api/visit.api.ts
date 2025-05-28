import { Get, Post } from '@/utils/request.ts'

export const visitData = () =>{
  return Get('/blog/visit')
}
export const visitAdd = () =>{
  return Post('/blog/visit')
}
