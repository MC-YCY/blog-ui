import { Header } from '@/components/project/header/header'
import { Footer } from '@/components/project/footer/footer'
import { Outlet } from 'react-router-dom'
import { MusicPlayer } from '@/components/project/music/player.tsx'
import { MusicConst } from '@/constant/music-const.ts'
import ShareBanner from '@/assets/images/share.png'

const Layout = () => {
  return (
    <>
      <Header></Header>
      <div className={'min-h-[calc(100vh-64px)] max-w-screen'}>
        <Outlet></Outlet>
      </div>
      <MusicPlayer musicList={MusicConst}
                   className={'sticky left-[20px] bottom-[20px] z-[50] mt-[60px] shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050]'}></MusicPlayer>
      <Footer></Footer>
      <img src={ShareBanner} className={'w-screen h-screen fixed left-0 top-0 z-[-1] pointer-none object-cover object-top'} alt="" />
    </>
  )
}
export default Layout