import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Routers } from '@/constant/routers.ts'
import RouterLocationProvider from '@/provider/RouterLocation.provider.tsx'

function renderRoutes(routes: any[]) {
  return routes.map((route, index) => {
    // 生成当前路由的 element JSX
    const Element = route.element
    const elementJSX = <Element />

    // 处理嵌套路由
    if (route.children) {
      return (
        <Route
          key={route.path || index}
          path={route.path}
          element={elementJSX}
        >
          {/* 递归渲染子路由 */}
          {renderRoutes(route.children)}
        </Route>
      )
    }

    // 无嵌套的普通路由
    return (
      <Route
        key={route.path || index}
        path={route.path}
        element={elementJSX}
      />
    )
  })
}

const PlayRouter = () => {
  const RouterComponents = renderRoutes(Routers)
  return <div className='root-routes'>
    <BrowserRouter>
      <RouterLocationProvider></RouterLocationProvider>
      <Routes>
        {RouterComponents}
      </Routes>
    </BrowserRouter>
  </div>
}
export default PlayRouter;