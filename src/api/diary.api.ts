import { Get, Post } from '@/utils/request.ts'
import { CreateDiaryDto, GetDiariesDto } from '@/types/diary.ts'

export const createDiary = (data: CreateDiaryDto) => {
  return Post('/blog/diaries', data)
}
export const getDiarys = (data: GetDiariesDto) => {
  return Get('/blog/diaries', data)
}
export const getMonthDiartsCount = (data: { date:string, username?: string }) => {
  return Get('/blog/diaries/month', data)
}