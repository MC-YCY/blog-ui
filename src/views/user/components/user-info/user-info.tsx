import useUserStore, { User } from '@/stores/userStore.ts'
import { Separator } from '@/components/ui/separator'
import { getIsFollower, getUserInfo, getUserStats, updateUserInfo } from '@/api/user.api.ts'
import { useEffect, useRef, useState } from 'react'
import { localhostUpload } from '@/api/upload.api.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import UserIcon from '@/assets/images/user.png'
import { useSearchParams } from 'react-router-dom'
import EditUserButton from './edit-user-button.tsx'
import { toggleArticlesUserFollow } from '@/api/article-user.api.ts'
import { Button } from '@/components/ui/button.tsx'

export default function() {
  const [searchParams] = useSearchParams()
  const { user: LoginUser, updateUser, unreadCount, userLayoutUpdateTimer, setUserLayoutUpdateTimer } = useUserStore()
  const [user, setUser] = useState<User | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const clickAvatar = () => {
    if (LoginUser?.id === user?.id) {
      fileInputRef?.current?.click()
    }
  }
  const fileInputChange = async () => {
    if (fileInputRef?.current?.files && fileInputRef?.current?.files.length && user?.id) {
      let file = fileInputRef.current?.files[0]
      let formData = new FormData()
      formData.append('file', file)
      const { fileUrl: avatar } = await localhostUpload(formData)
      const newUserInfo = await updateUserInfo(user?.id, {
        avatar,
      })
      updateUser(newUserInfo)
      setUser(newUserInfo)
    }
  }


  const [stats, setStats] = useState<{
    articlesCount: number,
    followersCount: number,
    followingCount: number,
    totalFavorites: number,
    totalLikes: number
  }>({
    articlesCount: 0,
    followersCount: 0,
    followingCount: 0,
    totalFavorites: 0,
    totalLikes: 0,
  })

  const getUserStatsFn = () => {
    getUserStats(searchParams.get('userId')).then(res => {
      setStats(res)
    })
  }
  const [isFollower, setIsFollower] = useState(false)
  useEffect(() => {
    let userId = searchParams.get('userId') ?? ''
    getUserInfo(userId).then(res => {
      setUser(res)
    })
    getUserStatsFn()
    if (!LoginUser) return
    getIsFollower(LoginUser?.id, userId).then(res => {
      setIsFollower(res)
    })
  }, [searchParams, unreadCount, userLayoutUpdateTimer])

  const editUserOk = (updateData: User | null) => {
    if (!updateData) return
    getUserInfo(updateData?.id).then((res: User) => {
      setUser(res)
      if (LoginUser && res && updateData.id === LoginUser.id) {
        updateUser(res)
      }
    })
  }

  const clickFollowingAuthor = async () => {
    if (!LoginUser) return
    if (!user) return
    await toggleArticlesUserFollow({
      userId: LoginUser.id,
      authorId: user.id,
    })
    setUserLayoutUpdateTimer()
  }

  return <div className="w-full pt-4">
    <div className="space-y-1">
      <div className="flex flex-col md:flex-row">
        {/* 头像部分 */}
        <div className="flex items-center md:flex-row">
          <Avatar
            className="w-12 h-12 md:w-14 md:h-14 cursor-pointer"
            onClick={clickAvatar}
          >
            <AvatarImage src={user?.avatar ? user?.avatar : UserIcon} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input type="file" hidden ref={fileInputRef} onChange={fileInputChange} />

          {/* 用户信息 */}
          <div className="my-auto ml-4">
            <h4 className="text-base md:text-sm font-bold leading-tight">{user?.username}</h4>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
              {user?.signature || '知其然不知其所以然'}
            </p>
          </div>
        </div>

        {/* 统计信息和操作按钮 */}
        <div className="ml-auto mt-4 md:mt-0 md:pl-3">
          <div className="flex flex-col md:flex-row md:items-center gap-2 h-full items-center">
            {/* 统计数据 - 移动端改为网格布局 */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 md:flex md:gap-0">
              <StatItem label="粉丝" value={stats.followersCount} />
              <StatItem label="关注" value={stats.followingCount} />
              <StatItem label="获赞" value={stats.totalLikes} />
              <StatItem label="收藏" value={stats.totalFavorites} />
              <StatItem label="文章" value={stats.articlesCount} />
            </div>

            {/* 操作按钮 */}
            <div className="md:ml-4">
              {LoginUser && (user?.id === LoginUser?.id ? (
                <EditUserButton user={user} updateOk={editUserOk} />
              ) : (
                <Button onClick={clickFollowingAuthor}>
                  {isFollower ? '取消关注' : '关注'}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Separator className="my-4" />
  </div>
}

// 新增的统计项组件
function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center space-x-1 text-sm ml-2 cursor-pointer">
      <span className="font-medium">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}