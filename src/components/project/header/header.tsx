'use client';

import {SignatureGroup} from "@/components/project/signature/signature";
import {ThemeSwitch} from "@/components/project/theme-switch/theme-switch";
import {HeaderMobileMenu} from './header-mobile-menu';
import {cn} from "@/lib/utils";
import style from './style.module.css';
import {blogConfig} from '@/blog.config'
import {useEffect, useRef, useState} from "react";
import {throttle} from 'lodash-es';
import {motion, useScroll} from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom'

const HeaderLogo = () => {
    return <>
        <div className='w-[300px]'>
            <div className='w-[150px]'>
                <SignatureGroup></SignatureGroup>
            </div>
        </div>
    </>
}
const HeaderNavigate = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const goRoute = (route: { path: string }) => {
        navigate(route.path);
    }
    return <div className='hidden lg:block flex-1'>
        <div
            className={cn('flex justify-center align-center text-sm text-foreground gap-[48px] cursor-pointer', style.navbar)}>
            {
                blogConfig.routes.map((route) => {
                    let className = '';
                    if (route.path === location.pathname) {
                        className = cn('font-bold', style.active,'active');
                    }
                    return <div key={route.path} className={cn(className, 'w-[46px]')} onClick={() => goRoute(route)}>
                        <route.icon className={className}></route.icon>
                    </div>
                })
            }
        </div>
    </div>
}
const HeaderScreen = () => {
    return <>
        <div className='w-[300px] justify-end flex'>
            <ThemeSwitch></ThemeSwitch>
        </div>
    </>
}
export const Header = () => {
    const [opacityClassName, setOpacityClassName] = useState('opacity-10')
    const [translateYClassName, setTranslateYClassName] = useState('translate-y-[0%]');
    const lastScrollY = useRef(0);  // 新增 ref 存储上次滚动位置

    useEffect(() => {
        const handleScroll = throttle(() => {
            const currentScrollY = document.documentElement.scrollTop;

            // 判断滚动方向
            const isScrollingDown = currentScrollY > lastScrollY.current;
            lastScrollY.current = currentScrollY;
            // 组合判断条件：滚动超过100px 且 向下滚动
            const shouldOpaque = currentScrollY > 100;
            if (shouldOpaque && currentScrollY > window.innerHeight) {
                if (isScrollingDown) {
                    setTranslateYClassName('translate-y-[-100%]');
                } else {
                    setTranslateYClassName('translate-y-[0%]');
                }
            } else {
                setTranslateYClassName('translate-y-[0%]');
            }
            setOpacityClassName(shouldOpaque ? 'opacity-86' : 'opacity-10');
        }, 100); // 100ms 节流间隔

        window.addEventListener('scroll', handleScroll);

        // 清理函数
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel(); // 重要！取消 lodash 的 throttle
        };
    }, []);
    const {scrollYProgress} = useScroll();

    return <>
        <motion.div
            className="fixed inset-x-0 top-0 z-50 h-[1px] origin-left bg-[#c800de]"
            style={{
                scaleX: scrollYProgress,
            }}
        />
        <div
            className={cn('w-full fixed z-[30]', translateYClassName, style.header)}>
            <div className={'max-w-[100rem] mx-auto h-[64px] px-2 md:px-8 flex items-center justify-between'}>
                <HeaderLogo></HeaderLogo>
                <HeaderNavigate></HeaderNavigate>
                <HeaderScreen></HeaderScreen>
                <HeaderMobileMenu></HeaderMobileMenu>
            </div>
        </div>
        <div
            className={cn('w-full h-[64px] fixed z-[20] pointer-events-none', opacityClassName, translateYClassName, style.headerBackground)}></div>
    </>
}