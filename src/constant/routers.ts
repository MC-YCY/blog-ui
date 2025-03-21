import React, { JSX } from 'react'
import { lazy } from 'react'
import RootLayout from '@/views/layout/index'
// 使用 Vite 的动态导入语法进行代码分割
const Home = lazy(() => import('@/views/home'))
const Resume = lazy(() => import('@/views/resume'))
const Posts = lazy(() => import('@/views/posts'))
const Login = lazy(() => import('@/views/auth/login'))
const DocsLayout = lazy(() => import('@/views/docs/layout'))
const SaCalendarReact = lazy(() => import('@/views/docs/sa-calendar-react'))
const SaCalendarVue3 = lazy(() => import('@/views/docs/sa-calendar-vue3'))
const UserLayout = lazy(() => import('@/views/user/layout'))
const UserPosts = lazy(() => import('@/views/user/posts/index'))
const UserLike = lazy(() => import('@/views/user/like/index'))
const UserCollect = lazy(() => import('@/views/user/collect/index'))
const Create = lazy(() => import('@/views/create/index'))

export interface MetaRouteObject {
  meta?: {
    title: string
    auth?: boolean
  }
  path: string
  element: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element) // 支持两种类型
  children?: MetaRouteObject[]
}

export const Routers: MetaRouteObject[] = [
  {
    path: '/',
    meta: { title: '' },
    element: RootLayout, // 根布局保持同步加载
    children: [
      {
        path: 'home',
        meta: { title: '首页' },
        element: Home,
      },
      {
        path: 'posts',
        meta: { title: '文章' },
        element: Posts,
      },
      {
        path: 'create',
        meta: { title: '创作' },
        element: Create,
      },
      {
        path: 'resume',
        meta: { title: '简历' },
        element: Resume,
      },
      {
        path: 'docs',
        element: DocsLayout,
        children: [
          {
            path: 'sa-calendar-react',
            meta: { title: 'sa-calendar-react' },
            element: SaCalendarReact,
          },
          {
            path: 'sa-calendar-vue3',
            meta: { title: 'sa-calendar-vue3' },
            element: SaCalendarVue3,
          },
        ],
      },
      {
        path: 'user',
        meta: { title: '个人中心' },
        element: UserLayout,
        children: [
          {
            path: 'posts',
            meta: { title: '文章' },
            element: UserPosts,
          },
          {
            path: 'like',
            meta: { title: '喜欢' },
            element: UserLike,
          },
          {
            path: 'collect',
            meta: { title: '收藏' },
            element: UserCollect,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    meta: { title: '登录' },
    element: Login,
  },
]

export const NavBarRouters: MetaRouteObject[] = Routers[0].children ?? []

/**
 * 规范化路径拼接，确保没有重复的 `/`
 * @param parts 需要拼接的路径片段
 * @returns 规范化后的路径
 */
export const joinPath = (...parts: string[]): string => {
  return parts
    .map((part) => part.replace(/^\/+|\/+$/g, '')) // 移除头部和尾部的 "/"
    .filter((part) => part.length > 0) // 过滤掉空字符串
    .join('/')
    .replace(/\/+/g, '/') // 确保不会出现 "//"
}

// 定义路由项的类型
interface RouteMeta {
  title: string;
}

interface RouteItem {
  path: string;
  meta?: RouteMeta;
  element?: React.FC;
  children?: RouteItem[];
}

/**
 * 递归处理路由，拼接完整路径，并存入 Map
 * @param routes 路由数组
 * @param parentPath 父级路径
 * @param routeMap 存储完整路径到 meta 的映射
 */
export const generateRouteMap = (
  routes: RouteItem[],
  parentPath = '',
  routeMap = new Map<string, RouteMeta>(),
) => {
  routes.forEach((route) => {
    const fullPath = `/${joinPath(parentPath, route.path)}` // 确保路径以 `/` 开头

    if (route.meta) {
      routeMap.set(fullPath, route.meta)
    }

    if (route.children) {
      generateRouteMap(route.children, fullPath, routeMap)
    }
  })

  return routeMap
}

export const routeMap = generateRouteMap(Routers)