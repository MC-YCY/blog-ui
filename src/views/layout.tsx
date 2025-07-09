import { Header } from '@/components/project/header/header'
import { Footer } from '@/components/project/footer/footer'
import { Outlet } from 'react-router-dom'
import { MusicPlayer } from '@/components/project/music/player.tsx'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <MusicPlayer className={'fixed left-[30px] bottom-[30px] z-[50]'}></MusicPlayer>
      <div className={'min-h-[calc(100vh-64px)] max-w-screen'}>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}
export default Layout