interface Message {
  id: number
  title: string
  content: string
  time: string
  isRead: boolean
}

const mockMessages: Message[] = [
  {
    id: 1,
    title: '系统通知',
    content: '欢迎使用我们的消息系统',
    time: '2024-03-20 10:00',
    isRead: false,
  },
  {
    id: 2,
    title: '更新提醒',
    content: '系统已更新到最新版本',
    time: '2024-03-19 15:30',
    isRead: true,
  },
  {
    id: 3,
    title: '维护通知',
    content: '系统将于今晚进行例行维护',
    time: '2024-03-18 09:15',
    isRead: true,
  },
]
export default function() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className="p-4 rounded-lg shadow bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">{message.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message.content}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {message.time}
                </span>
              </div>
              {!message.isRead && (
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-100">
                    未读
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  )
}