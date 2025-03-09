import RootLayout from '@/views/layout/index'
import Home from '@/views/home'
import About from '@/views/about'
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
      {
        path: 'about',
        meta: {
          title: '关于',
        },
        element: About,
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

export const NavBarRouters: MetaRouteObject[] = Routers[0].children ?? [];

/**
 * 规范化路径拼接，确保没有重复的 `/`
 * @param parts 需要拼接的路径片段
 * @returns 规范化后的路径
 */
export const joinPath = (...parts: string[]): string => {
  return parts
    .map((part) => part.replace(/^\/+|\/+$/g, "")) // 移除头部和尾部的 "/"
    .filter((part) => part.length > 0) // 过滤掉空字符串
    .join("/")
    .replace(/\/+/g, "/"); // 确保不会出现 "//"
};

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
  parentPath = "",
  routeMap = new Map<string, RouteMeta>()
) => {
  routes.forEach((route) => {
    const fullPath = `/${joinPath(parentPath, route.path)}`; // 确保路径以 `/` 开头

    if (route.meta) {
      routeMap.set(fullPath, route.meta);
    }

    if (route.children) {
      generateRouteMap(route.children, fullPath, routeMap);
    }
  });

  return routeMap;
};

export const routeMap = generateRouteMap(Routers);