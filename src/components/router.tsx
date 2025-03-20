import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { Routers } from '@/constant/routers.ts'
import RouterLocationProvider from '@/provider/RouterLocation.provider.tsx'
import useUserStore from '@/stores/userStore.ts'
import { ReactElement, useEffect } from 'react'

// 路由守卫组件
const AuthGuard = ({ children, meta }: {
  children: ReactElement
  meta?: { auth?: boolean; title: string }
}) => {
  const { isLoggedIn } = useUserStore()
  const location = useLocation()

  // 动态修改页面标题
  useEffect(() => {
    if (meta?.title) {
      document.title = `${meta.title} | Your Site Name`
    }
  }, [meta?.title])

  // 权限验证逻辑
  if (meta?.auth && !isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

// 递归渲染路由（带类型校验）
function renderRoutes(routes: typeof Routers): React.ReactNode[] {
  return routes.map((route, index) => {
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
      <Route {...routeProps}>
        {renderRoutes(route.children)}
      </Route>
    ) : (
      <Route {...routeProps} />
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
          {/* 处理未匹配路由 */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default PlayRouter