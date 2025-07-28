'use client'

import { SignatureGroup } from '@/components/project/signature/signature'
import { ThemeSwitch } from '@/components/project/theme-switch/theme-switch'
import { HeaderMobileMenu } from './header-mobile-menu'
import { cn } from '@/lib/utils'
import style from './style.module.css'
import { blogConfig } from '@/constant/blog.config.ts'
import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'
import { motion, useScroll } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { MotionValue } from 'motion/react'

const HeaderLogo = () => {
  const navigate = useNavigate()
  return <>
    <div className="w-[300px]">
      <div className="w-[120px] cursor-pointer" onClick={() => navigate('/home')}>
        <SignatureGroup></SignatureGroup>
      </div>
    </div>
  </>
}
const HeaderNavigate = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const goRoute = (route: { path: string }) => {
    navigate(route.path)
  }
  return <div className="hidden lg:block flex-1 mt-[-3px]">
    <div
      className={cn('flex justify-center align-center text-sm text-foreground gap-[48px] cursor-pointer', style.navbar)}>
      {
        blogConfig.routes.map((route) => {
          let className = ''
          if (route.path === location.pathname) {
            className = cn('font-bold', style.active, 'active')
          }
          return <div key={route.path} className={cn(className, 'w-[42px]')} onClick={() => goRoute(route)}>
            <span>
              {route.name}
            </span>
            {/*<route.icon className={className}></route.icon>*/}
          </div>
        })
      }
    </div>
  </div>
}
const HeaderScreen = () => {
  return <>
    <div className="w-[300px] justify-end flex">
      <ThemeSwitch></ThemeSwitch>
    </div>
  </>
}
export const Header = () => {
  const [translateYClassName, setTranslateYClassName] = useState('translate-y-[0%]')
  const lastScrollY = useRef(0)  // 新增 ref 存储上次滚动位置
  const isScroll = useRef(true)
  useEffect(() => {
    const handleScroll = throttle(() => {
      clickMockBeforeHashChange()

      if (!isScroll.current) {
        isScroll.current = true
        return
      }
      const currentScrollY = document.documentElement.scrollTop
      // 判断滚动方向
      const isScrollingDown = currentScrollY > lastScrollY.current
      lastScrollY.current = currentScrollY
      // 组合判断条件：滚动超过100px 且 向下滚动
      const shouldOpaque = currentScrollY > 100
      if (shouldOpaque && currentScrollY > window.innerHeight) {
        if (isScrollingDown) {
          setTranslateYClassName('translate-y-[-100%]')
        } else {
          setTranslateYClassName('translate-y-[0%]')
        }
      } else {
        setTranslateYClassName('translate-y-[0%]')
      }
    }, 100) // 100ms 节流间隔
    const handleScrollEnd = () => {
      window.addEventListener('scroll', handleScroll)
      window.removeEventListener('scrollend', handleScrollEnd)
    }
    const handleHashChange = () => {
      isScroll.current = false
      setTranslateYClassName('translate-y-[-100%]')
      window.removeEventListener('scroll', handleScroll)
      window.addEventListener('scrollend', handleScrollEnd)
    }
    window.addEventListener('scroll', handleScroll)
    // window.addEventListener('hashchange', handleHashChange);
    // 在锚点滚动后触发事件，也就是锚点hash更新后触发这时候已经滚动了，在scroll事件前因此删除scroll事件无效
    const clickMockBeforeHashChange = () => {
      // a 标签动态创建的，放到scroll事件中去异步获取
      document.querySelectorAll('a[href^="#comment"]').forEach((anchor) => {
        const a = anchor as HTMLAnchorElement
        if (!a) return
        a.onclick = () => {
          handleHashChange()
        }
      })
    }
    // 如果第一次进入，含有hash则触发一次beforeHash
    if (location.hash) {
      handleHashChange()
    }
    // 清理函数
    return () => {
      window.removeEventListener('scrollend', handleScrollEnd)
      window.removeEventListener('scroll', handleScroll)
      handleScroll.cancel() // 重要！取消 lodash 的 throttle
    }
  }, [])
  const { scrollYProgress } = useScroll()

  return <>
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[1px] origin-left bg-[linear-gradient(121deg,rgba(196,255,255,1)_0%,rgba(127,156,76,1)_100%)]"
      style={{
        scaleX: scrollYProgress as MotionValue<number>,
      }}
    />
    <div
      className={cn('w-full fixed top-0 z-[30]', translateYClassName, style.header)}>
      <div
        className={cn(
          'max-w-[1400px] mt-[7px] mx-auto h-[50px] px-4 md:px-8 flex items-center justify-between',
          'bg-[rgba(255,255,255,.3)] dark:bg-[rgba(0,0,0,.3)] backdrop-blur-2xl rounded-[40px]',
          'shadow-[0_0_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_8px_rgba(255,255,255,.12)]')}>
        <HeaderLogo></HeaderLogo>
        <HeaderNavigate></HeaderNavigate>
        <HeaderScreen></HeaderScreen>
        <HeaderMobileMenu></HeaderMobileMenu>
      </div>
    </div>
  </>
}