import { useEffect, useState } from 'react'
import useUserStore from '@/stores/userStore.ts'
import { getUserButtons, getUserMenu, getUserInfo } from '@/api/user.api.ts'

// 用来获取 用户 权限按钮的
const UserBtnListProvider = () => {
  const { setButtons, setMenus, logout, user,updateUser } = useUserStore()
  const [flat, setFlat] = useState<boolean>(false)
  const getPermissions = async () => {
    try {
      const menus = await getUserMenu()
      const buttons = await getUserButtons()
      if(user?.id){
        const userInfo = await getUserInfo(user.id)
        updateUser(userInfo)
      }
      setButtons(buttons)
      setMenus(menus)
    } catch {
      logout()
    }
    setFlat(true)
  }
  useEffect(() => {
    if (flat) {
      return
    }
    getPermissions()
  }, [flat])
  return null
}

export default UserBtnListProvider