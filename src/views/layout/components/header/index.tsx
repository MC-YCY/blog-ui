import { useCallback, useEffect, useRef } from 'react'
import NavBar from './components/nav-bar.tsx'
import ThemeButton from './components/theme-button.tsx'
import UserButton from './components/user-button.tsx'
import DrawerButton from './components/drawer-button.tsx'
import Container from '@/components/container.tsx'
import PostsScreenButton from './components/posts-screen.button.tsx'
import MessageButton from './components/message-button.tsx'

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop
    if (headerRef.current) {
      if (scrollTop > 62) {
        headerRef.current.classList.remove('border-transparent')
        headerRef.current.classList.add('border-b', 'border-border')
      } else {
        headerRef.current.classList.add('border-transparent')
        headerRef.current.classList.remove('border-b', 'border-border')
      }
    }
  }, [])

  useEffect(() => {
    document.body.onscroll = handleScroll
    return () => {
      document.body.onscroll = null
    }
  }, [handleScroll])

  return (
    <header
      ref={headerRef}
      className="z-[150] sticky top-0 w-full bg-background border-b border-transparent transition-colors"
    >
      <div className="hidden lg:block">
        <Container className="flex items-center h-16">
          <div className="mr-4 hidden md:flex">
            logo
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium xl:flex">
            <NavBar />
          </nav>
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
            <PostsScreenButton />
            <ThemeButton />
            <MessageButton />
            <UserButton />
          </div>
        </Container>
      </div>
      <div className="block lg:hidden">
        <div className="flex justify-between items-center w-full rounded-md px-4 py-4">
          <a href="/" className="flex items-center gap-1.5">login</a>
          <div className="flex items-center gap-4">
            <ThemeButton />
            <UserButton />
            <DrawerButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
