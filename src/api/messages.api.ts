import { Get, Post } from '@/utils/request.ts'
import { MessageBoard } from '@/types/message-board.ts'

export const createMessage = (data:MessageBoard) => {
  return Post('/blog/messages',data)
}
export const getMessages = (data: {
  page: number;
  limit: number;
}) => {
  return Get('/blog/messages', data)
}
