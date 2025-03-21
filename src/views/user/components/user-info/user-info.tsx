import useUserStore, { User } from '@/stores/userStore.ts'
import { Separator } from '@/components/ui/separator'
import { getUserInfo, updateUserInfo } from '@/api/user.api.ts'
import { useEffect, useRef, useState } from 'react'
import { localhostUpload } from '@/api/upload.api.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import UserIcon from '@/assets/images/user.png'
import { useSearchParams } from 'react-router-dom'
import EditUserButton from './edit-user-button.tsx'

export default function() {
  const [searchParams] = useSearchParams()
  const { user: LoginUser, updateUser } = useUserStore()
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
      updateUser(newUserInfo);
      setUser(newUserInfo)
    }
  }

  useEffect(() => {
    let userId = searchParams.get('userId') ?? ''
    getUserInfo(userId).then(res => {
      setUser(res)
    })
  }, [searchParams])

  const editUserOk = (updateData: User | null) => {
    if (!updateData) return
    getUserInfo(updateData?.id).then((res: User) => {
      setUser(res)
      if (LoginUser && res && updateData.id === LoginUser.id) {
        updateUser(res)
      }
    })
  }

  return <div className={'w-full pt-4'}>
    <div className="space-y-1">
      <div className={'flex align-center'}>
        <Avatar className="w-14 h-14 object-cover cursor-pointer" onClick={clickAvatar}>
          <AvatarImage src={user?.avatar ? user?.avatar : UserIcon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={fileInputChange} />
        <div className={'my-auto mx-0 ml-4'}>
          <h4 className="text-sm leading-none font-bold">{user?.username}</h4>
          <p className="text-sm text-muted-foreground mt-1">{user?.signature || '知其然不知其所以然'}</p>
        </div>
        <div className={'ml-auto my-auto pl-3'}>
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div className={'cursor-pointer whitespace-nowrap'}>粉丝</div>
            <Separator orientation="vertical" />
            {
              user?.id === LoginUser?.id ? <EditUserButton user={user} updateOk={editUserOk}></EditUserButton>
                : <div className={'cursor-pointer  whitespace-nowrap'}>关注</div>
            }
          </div>
        </div>
      </div>
    </div>
    <Separator className="my-4" />
  </div>
}