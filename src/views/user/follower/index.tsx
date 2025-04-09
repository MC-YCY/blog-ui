import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import UserIcon from '@/assets/images/user.png'
import { Separator } from '@/components/ui/separator.tsx'
import { useEffect, useState } from 'react'
import { getUserFollowers } from '@/api/user.api.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUserStore, { User } from '@/stores/userStore.ts'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'

export default function() {
  const [searchParams] = useSearchParams() // 直接用
  const [userList, setUserList] = useState<User[]>([])
  const navigate = useNavigate()
  const { userLayoutUpdateTimer, unreadCount } = useUserStore()

  const getList = (page: number) => {
    if (!searchParams.get('userId')) return
    getUserFollowers(searchParams.get('userId'), {
      page: page,
      limit: 5,
    }).then(res => {
      setUserList(res.records)
      setTotal(res.total)
    })
  }

  useEffect(() => {
    setCurrentPage(1)
    getList(1)
  }, [searchParams, userLayoutUpdateTimer, unreadCount])

  const goUserPage = (user: User) => {
    navigate(`/user/posts?userId=${user.id}`)
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, _setPageSize] = useState<number>(5)
  const [total, setTotal] = useState<number>(0)
  const onChange = (p: number) => {
    setCurrentPage(p)
    getList(p)
  }

  return <div className={'pt-4'}>
    <div className={'fixed bottom-10 flex justify-center w-full left-0 z-10'}>
      <SmartPagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
    {
      userList.map((user) => {
        return <div key={user.id} className={'w-full'}>
          <div className="space-y-1">
            <div className={'flex align-center'}>
              <Avatar className="w-14 h-14 object-cover cursor-pointer" onClick={() => goUserPage(user)}>
                <AvatarImage src={user?.avatar ? user?.avatar : UserIcon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={'my-auto mx-0 ml-4'}>
                <h4 className="text-sm leading-none font-bold">{user?.username}</h4>
                <p className="text-sm text-muted-foreground mt-1">{user?.signature || '知其然不知其所以然'}</p>
              </div>
            </div>
          </div>
          <Separator className="mt-1" />
        </div>
      })
    }
    <div className={'h-20'}></div>
  </div>
}