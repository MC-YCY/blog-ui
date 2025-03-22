import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { Routers } from '@/constant/routers.ts'
import RouterLocationProvider from '@/provider/RouterLocation.provider.tsx'
import useUserStore from '@/stores/userStore.ts'
import React, { ReactElement, useEffect, Suspense } from 'react'
import { LoadingPage } from '@/components/loading.tsx'

// 优化后的路由守卫组件
const AuthGuard = ({ children, meta }: {
  children: ReactElement
  meta?: { auth?: boolean; title: string }
}) => {
  const { isLoggedIn } = useUserStore()
  const location = useLocation()

  useEffect(() => {
    document.title = meta?.title ? `${meta.title} | Blog` : 'Blog';
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // 可选 'smooth' 平滑滚动
    })
  }, [meta?.title])
  if (meta?.auth && !isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      {children}
    </Suspense>
  )
}

// 类型安全的递归路由渲染
function renderRoutes(routes: typeof Routers): React.ReactNode[] {
  return routes.map((route, index) => {
    // 动态导入组件（假设路由配置已使用React.lazy）
    const Element = route.element

    const elementJSX = (
      <AuthGuard meta={route.meta}>
        <Element />
      </AuthGuard>
    )

    const routeProps = {
      key: route.path || index,
      path: route.path,
      element: elementJSX
    }

    return route.children ? (
      <Route {...routeProps} key={route.path}>
        {renderRoutes(route.children)}
      </Route>
    ) : (
      <Route {...routeProps} key={route.path}/>
    )
  })
}

const PlayRouter = () => {
  return (
    <div className='root-routes'>
      <BrowserRouter>
        <RouterLocationProvider />
        <Routes>
          {renderRoutes(Routers)}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default PlayRouter