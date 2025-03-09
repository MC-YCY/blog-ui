import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Routers } from "@/constant/routers.ts";

/**
 * 规范化路径拼接，确保没有重复的 `/`
 * @param parts 需要拼接的路径片段
 * @returns 规范化后的路径
 */
const joinPath = (...parts: string[]): string => {
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
const generateRouteMap = (
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

const RouterLocationProvider = () => {
  const location = useLocation();

  // 预计算路由映射表（仅计算一次）
  const routeMap = useMemo(() => generateRouteMap(Routers), []);

  useEffect(() => {
    const matchedMeta = routeMap.get(location.pathname);
    document.title = matchedMeta?.title || "默认标题";
  }, [location, routeMap]);

  return null;
};

export default RouterLocationProvider;
