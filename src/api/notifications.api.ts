import { Get } from '@/utils/request.ts'

export const getUserNotifications = (userId: number | string | null, data: Record<string, number | string>) => {
  return Get(`/blog/notifications/info/${userId}`, data)
}

export const userReadNotification = (id: number | string | null, data: { userId: string | number | undefined }) => {
  return Get(`/blog/notifications/read/${id}`, data)
}