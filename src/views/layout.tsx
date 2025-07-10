import { Header } from '@/components/project/header/header'
import { Footer } from '@/components/project/footer/footer'
import { Outlet } from 'react-router-dom'
import { MusicPlayer } from '@/components/project/music/player.tsx'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <div className={'min-h-[calc(100vh-64px)] max-w-screen'}>
        <Outlet></Outlet>
      </div>
      <MusicPlayer className={'sticky left-[20px] bottom-[20px] z-[50] mt-[60px] shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050]'}></MusicPlayer>
      <Footer></Footer>
    </>
  )
}
export default Layout