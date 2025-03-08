import { useCallback, useEffect, useRef } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    if (headerRef.current) {
      const classList: string[] = ['border-b', 'bg-white', 'dark:bg-black', 'border-neutral-200', 'dark:border-white/[0.1]'];
      classList.forEach((classname: string) => {
        if (scrollTop > 140) {
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
    <header ref={headerRef} className="z-[50] sticky top-0 w-full bg-transparent border-b border-transparent">
      <div className="hidden lg:block">
        lg:block
      </div>
      <div className="block lg:hidden">
        log:hidden
      </div>
    </header>
  );
};
export default Header;