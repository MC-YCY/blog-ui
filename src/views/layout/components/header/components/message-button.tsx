import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { BellIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import useUserStore from '@/stores/userStore'
import { useNavigate } from 'react-router-dom'

// 定义通知类型（根据你的后端实体调整）
interface AppNotification {
  id: number
  type: string
  content: string
  createdAt: string
  read: boolean
}

export default function NotificationBell() {
  const { user, setUserUnreadCount } = useUserStore()
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(0)
  const socketRef = useRef<Socket | null>(null)

  const handleNavigate = () => {
    if (!user?.id) return
    navigate(`/user/message?userId=${user.id}`)
  }

  useEffect(() => {
    if (!user?.id) return

    // 初始化 Socket 连接
    socketRef.current = io('http://localhost:3000', {
      query: { userId: user.id.toString() }, // 必须字符串类型
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    })

    // 连接成功处理
    socketRef.current.on('connect', () => {
      console.log('WebSocket connected')
      // 获取初始未读数量（需要后端实现对应接口）
      socketRef.current?.emit('get-unread-count')
      socketRef?.current?.on('unread-count', (count: number) => {
        setUnreadCount(count)
        setUserUnreadCount(count)
      })
    })

    socketRef.current.on('updated-unread-count', (count: number) => {
      setUnreadCount(count);
      setUserUnreadCount(count)
    });

    // 接收新通知
    socketRef.current.on('new-notification', (notification: AppNotification) => {
      console.log(notification)
      setUnreadCount(prev => prev + 1)
      setUserUnreadCount(unreadCount + 1)
    })

    // 连接错误处理
    socketRef.current.on('connect_error', (err) => {
      console.error('Connection error:', err.message)
    })

    // 断线重连处理
    socketRef.current.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnect attempt: ${attempt}`)
    })

    // 清理函数
    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [user?.id]) // 仅依赖 userId

  return (
    <Button
      variant="ghost"
      className="relative p-2 mr-2.5"
      onClick={handleNavigate}
      disabled={!user}
    >
      <BellIcon className="h-5 w-5" />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 animate-pulse">
          <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        </div>
      )}
    </Button>
  )
}