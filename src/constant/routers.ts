import RootLayout from '@/views/layout/index'
import Home from '@/views/home'
import Login from '@/views/auth/login'
import { JSX } from 'react'

interface MetaRouteObject {
  meta?: {
    title: string;
  };
  path: string;
  element: () => JSX.Element;
  children?: MetaRouteObject[]; // 递归定义子路由
}

export const Routers: MetaRouteObject[] = [
  {
    path: '/',
    meta: {
      title: '',
    },
    element: RootLayout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页',
        },
        element: Home,
      },
    ],
  },
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    element: Login,
  },
]