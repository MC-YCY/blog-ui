'use client'

import { IconBrandGithub, IconBrandReact, IconBrandTailwind } from '@tabler/icons-react'
import gaIcon from '@/assets/images/ga.png'

export const Footer = () => {
  return <div className={'bg-[#000] mt-20'}>
    <div className={'max-w-[1400px] mx-auto py-10 px-2 md:px-8 flex flex-wrap'}>
      <div className={'text-background text-[14px] flex items-center cursor-default'}>
        <img src={gaIcon} className={'h-[20px]'} alt="" />
        <span className={'ml-[4px]'}>京ICP备2025133833号</span>
      </div>
      <div className={'flex gap-[4vw] flex-wrap ml-auto'}>
        <a className={'text-[#fff] cursor-pointer'} target={'_blank'} href={'https://react.dev/'}>
          <IconBrandReact></IconBrandReact>
        </a>
        <a className={'text-[#fff] cursor-pointer'} target={'_blank'} href={'https://tailwindcss.com/'}>
          <IconBrandTailwind></IconBrandTailwind>
        </a>
        <a className={'text-[#fff] cursor-pointer'} target="_blank" rel="noreferrer"
           href={'https://github.com/MC-YCY/blog-ui/tree/next-blog-ui'}>
          <IconBrandGithub></IconBrandGithub>
        </a>
      </div>
    </div>
  </div>
}