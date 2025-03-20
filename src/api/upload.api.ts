import { Post } from '@/utils/request.ts'
export const localhostUpload = (data: FormData) => {
  return Post('/blog/upload/localhost', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
