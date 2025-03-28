import { BellIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button.tsx'
import useUserStore from '@/stores/userStore.ts'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function() {
  const { user } = useUserStore()
  const navigate = useNavigate()
  const goUserMessage = (): void => {
    let userId = user?.id
    if (!userId) return
    navigate(`/user/message?userId=${userId}`)
  }
  // const ws = useRef<WebSocket>(null); // 使用 useRef 保存 WebSocket 实例

  useEffect(() => {
    // ws.current = new WebSocket('ws://localhost:3000');
    //
    // // 2. 监听连接打开
    // ws.current.onopen = () => {
    //   console.log('WebSocket 连接已建立');
    // };
    //
    // // 3. 监听接收消息
    // ws.current.onmessage = (event) => {
    //   const newMessage = event.data;
    //   console.log(newMessage)
    // };
  })


  return <>
    {user ?
      <Button
        variant="ghost"
        className="relative p-2 mr-2.5"  // 添加相对定位和圆形按钮
        onClick={goUserMessage}
      >
        <BellIcon className="h-5 w-5" />
        {/* 消息提示泡 */}
        <div className="absolute -top-1 -right-1">
          <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          3
          </div>
        </div>
      </Button>
      :
      null
    }
  </>
}