import { useEffect, useState } from 'react'
import { Notification } from '@/types/notification.ts'
import dayjs from 'dayjs'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { getUserNotifications, userReadNotification } from '@/api/notifications.api.ts'
import useUserStore from '@/stores/userStore.ts'
import { NotificationTypeText } from '@/types/enums/article-status.enum.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast as Toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'

export default function() {
  const [notificatios, setNotifications] = useState<Notification[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [pageSize, _setPageSize] = useState(10)
  const { user: LoginUser, unreadCount } = useUserStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams() // 直接用
  const [webType, setWebType] = useState<string>(' ')

  const getList = (page: number, read: string) => {
    if (!searchParams.get('userId')) return
    getUserNotifications(searchParams.get('userId'), {
      page: page,
      limit: pageSize,
      read,
    }).then(res => {
      setTotal(res.total)
      setNotifications(res.items)
    })
  }
  const changeWebType = (value: string) => {
    setWebType(value)
    getList(currentPage, value)
  }
  const onChange = (p: number) => {
    setCurrentPage(p)
    getList(p, webType)
  }
  const goArticle = (message: Notification) => {
    if (!message?.article?.id) {
      return
    }
    navigate('/article?id=' + message?.article?.id)
  }
  const goUser = (message: Notification) => {
    if (!message.sender.id) return
    navigate(`/user/posts?userId=${message.sender.id}`)
  }
  const clickRead = async (message: Notification) => {
    if (message.read) return
    if (LoginUser?.id != searchParams.get('userId')) {
      return
    }
    await userReadNotification(message.id, { userId: LoginUser?.id })
    Toast('Tip', {
      description: '消息已读',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    })
  }
  useEffect(() => {
    // setWebType(' ')
    // setCurrentPage(1)
    // getList(1, ' ')
    getList(currentPage, webType)
  }, [unreadCount, searchParams])
  return (
    <div>
      <div className={'fixed bottom-10 flex justify-center w-full left-0 z-10'}>
        <SmartPagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
        />
      </div>

      <div className={'flex justify-end'}>
        <Select value={webType} defaultValue=" " onValueChange={(value) => changeWebType(value)}>
          <SelectTrigger className="w-[180px] bg-background text-foreground">
            <SelectValue placeholder="技术类型" />
          </SelectTrigger>
          <SelectContent className="z-[1000000] bg-popover text-popover-foreground">
            <SelectGroup>
              <SelectLabel>options</SelectLabel>
              <SelectItem value={' '}>全部</SelectItem>
              <SelectItem value={'1'}>已读</SelectItem>
              <SelectItem value={'0'}>未读</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {
            notificatios.map((message) => {
              let text: string = ''
              let title = NotificationTypeText[message.type]

              let textIsStartMap: Record<string, any> = {
                '喜欢': {
                  'true': <div>
                    点赞了文章-<a className={'text-primary'}
                                  onClick={() => goArticle(message)}>{message?.article?.title}</a>
                  </div>,
                  'false': <div>
                    取消点赞了文章-<a className={'text-primary'}
                                      onClick={() => goArticle(message)}>{message?.article?.title}</a>
                  </div>,
                },
                '收藏': {
                  'true': <div>
                    收藏了文章-<a className={'text-primary'}
                                  onClick={() => goArticle(message)}>{message?.article?.title}</a>
                  </div>,
                  'false': <div>
                    取消收藏了文章-<a className={'text-primary'}
                                      onClick={() => goArticle(message)}>{message?.article?.title}</a>
                  </div>,
                },
                '关注': {
                  'true': <div>关注你</div>,
                  'false': <div>取消关注了你</div>,
                },
              }
              text = textIsStartMap[title][String(message.isStart)]
              return (
                <div
                  onClick={() => clickRead(message)}
                  key={message.id}
                  className="cursor-pointer p-4 rounded-lg shadow bg-background transition-colors group relative overflow-hidden rounded-xl bg-background shadow-md border transition-all backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <div className="text-gray-600 dark:text-gray-300 flex">
                        <a className={'text-primary'}
                           onClick={() => goUser(message)}>{message.sender.username}</a>-{text}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                  {dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                </span>
                  </div>
                  {!message.read && (
                    <div className="mt-2">
                  <span
                    className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-100">
                    未读
                  </span>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={'h-20'}></div>
    </div>
  )
}