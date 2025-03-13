import {Post,Get} from '@/utils/request.ts'
export const loginApi = (data: any) =>{
  return Post('/blog/auth/login',data)
}

export const getCaptchaApi =() =>{
  return Get(`/blog/auth/captcha`)
}

export const getPermissionsApi = () =>{
  return Get(`/blog/auth/permissions`)
}
export const logoutApi = (data: any) =>{
  return Post('/blog/auth/logout',data)
}