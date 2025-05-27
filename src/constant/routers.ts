import React, { JSX } from 'react'
import { lazy } from 'react'
const RootLayout = lazy(() => import('@/views/layout.tsx'))
const Home = lazy(() => import('@/views/home/page.tsx'))
const Article = lazy(() => import('@/views/article/page.tsx'))
const Diary = lazy(() => import('@/views/diary/page.tsx'))
const Picture = lazy(() => import('@/views/picture/page.tsx'))
const About = lazy(() => import('@/views/about/page.tsx'))

export interface MetaRouteObject {
  meta?: {
    title: string
    auth?: boolean
    screen?: boolean
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
        path: '/home',
        meta: { title: '首页', screen: true },
        element: Home,
      },
      {
        path: 'article',
        meta: { title: '文章', screen: true },
        element: Article,
      },
      {
        path: 'diary',
        meta: { title: '日记', screen: true },
        element: Diary,
      },
      {
        path: 'picture',
        meta: { title: '图集', screen: true },
        element: Picture,
      },
      {
        path: 'about',
        meta: { title: '关于', screen: true },
        element: About,
      },
    ],
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