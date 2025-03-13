import { useEffect, useState } from 'react'
import useUserStore from '@/stores/userStore.ts'
import { getPermissionsApi } from '@/api/auth.api.ts'

// 用来获取 用户 权限按钮的
const UserBtnListProvider = () => {
  const { setBtnList } = useUserStore()
  const [flat,setFlat] = useState<boolean>(false)
  const getPermissions = () => {
    getPermissionsApi().then(res => {
      setBtnList(res.btnList)
    })
    setFlat(true)
  }
  useEffect(()=>{
    if(flat){
      return;
    }
    getPermissions()
  },[flat])
  return null
}

export default UserBtnListProvider