import RootLayout from '@/views/layout/index'
import Home from '@/views/home'
import Login from '@/views/auth/login'

export const Routers = [
  {
    path: '/',
    meta:{
      title:''
    },
    element: RootLayout,
    children: [
      {
        path:'home',
        meta:{
          title:'首页'
        },
        element: Home,
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title:'登录',
    },
    element: Login,
  }
]