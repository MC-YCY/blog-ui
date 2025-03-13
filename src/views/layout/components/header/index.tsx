import { useCallback, useEffect, useRef } from 'react';
import NavBar from './components/nav-bar.tsx'
import ThemeButton from './components/theme-button.tsx'
import UserButton from './components/user-button.tsx'
import DrawerButton from './components/drawer-button.tsx'
import Container from '@/components/container.tsx'
import PostsScreenButton from './components/posts-screen.button.tsx'


const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    if (headerRef.current) {
      if(scrollTop > 62){
        headerRef.current?.classList.remove('border-transparent');
      }else{
        headerRef.current?.classList.add('border-transparent');
      }
      const classList: string[] = ['border-b', 'bg-white', `dark:bg-black`, 'border-neutral-200', `dark:border-white/[0.1]`];
      classList.forEach((classname: string) => {
        if (scrollTop > 62) {
          headerRef.current?.classList.add(classname);
        } else {
          headerRef.current?.classList.remove(classname);
        }
      });
    }
  }, []);

  useEffect(() => {
    document.body.onscroll = handleScroll;
    return () => {
      document.body.onscroll = null;
    };
  }, [handleScroll, headerRef]);

  return (
    <header ref={headerRef} className="z-[150] sticky top-0 w-full bg-transparent border-b border-transparent transition-colors">
      <div className="hidden lg:block">
        <Container className={'flex items-center h-16'}>
          <div className="mr-4 hidden md:flex">
            logo
          </div>
          <nav className='flex items-center space-x-6 text-sm font-medium xl:flex'>
            <NavBar></NavBar>
          </nav>
          <div className='flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end'>
            <PostsScreenButton></PostsScreenButton>
            <ThemeButton></ThemeButton>
            <UserButton></UserButton>
          </div>
        </Container>
      </div>
      <div className="block lg:hidden">
        <div className='flex justify-between  items-center w-full rounded-md px-4 py-4'>
          <a href="/" className='flex items-center gap-1.5'>login</a>
          <div className='flex items-center gap-4'>
            <ThemeButton></ThemeButton>
            <UserButton></UserButton>
            <DrawerButton></DrawerButton>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;