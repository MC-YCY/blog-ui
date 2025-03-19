import { useEffect, useState } from 'react'
import useUserStore from '@/stores/userStore.ts'
import { getUserButtons, getUserMenu } from '@/api/user.api.ts'

// 用来获取 用户 权限按钮的
const UserBtnListProvider = () => {
  const { setButtons, setMenus, logout } = useUserStore()
  const [flat, setFlat] = useState<boolean>(false)
  const getPermissions = async () => {
    try {
      const menus = await getUserMenu()
      const buttons = await getUserButtons()
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