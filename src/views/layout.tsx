import { Header } from '@/components/project/header/header'
import { Footer } from '@/components/project/footer/footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <div className={'min-h-[calc(100vh-64px)] max-w-screen'}>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}
export default Layout