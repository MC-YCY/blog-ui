'use client'

import { SignatureGroup } from '@/components/project/signature/signature'
import { Diary } from '@/components/project/diary/diary'
import { IconSunFilled } from '@tabler/icons-react'
import { BlogSvgIcon, GiteeSvgIcon, GithubSvgIcon, IsqqwSvgIcon } from '@/components/project/svg-icons/website'
import { CodeBlock } from '@/components/ui/code-block'
import HuaDark from '@/assets/images/article-banner/hua_dark.png'
import HuaLight from '@/assets/images/article-banner/hua.png'
import HuaLightThumbnail from '@/assets/images/article-banner/hua_thumbnail.png'
import HeroBanner from '@/assets/images/panel/25673.png'
import HeroBannerThumbnail from '@/assets/images/panel/25673_thumbnail.png'
import HeroBannerFc from '@/assets/images/panel/25673_fc.png'
import { cn } from '@/lib/utils.ts'
import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

export const HomeHeroContent = () => {
  return <div className="absolute h-screen flex w-full left-0 z-[10] justify-center items-center pointer-events-none">
    <div className="container flex flex-col md:flex-row justify-around items-center pointer-events-auto">
      <div className="flex flex-col items-center md:items-start space-y-4 aos-init aos-animate px-2">
        <div>
          <div className="w-[30vw] min-w-[300px]">
            <SignatureGroup s2Class={'delay-3000!'}></SignatureGroup>
          </div>

          <div className="mt-[24px] cursor-default pl-[8px]">
            <Diary
              className1={'bg-[rgba(255,255,255,.65)] dark:bg-[rgba(0,0,0,.6)]'}
              className2={'bg-[rgba(255,255,255,.65)] dark:bg-[rgba(0,0,0,.6)]'}
              title={'春秋半夏'}
              date={'2025/5/15'}
              weather={<IconSunFilled width={24} height={24} color={'#ecca2f'} />}
              content={<>
                <p>
                  一名 <del className="text-[#f56c6c] font-bold">吹牛</del> 开发工程师，什么都不会，这也不学那也不学。
                </p>
                <p>时间轮回, 一年又一年,你还在想着新技术出来了,</p>
                <p>
                  继续学习什么
                  <a className="text-[#0070f3] font-bold cursor-pointer" target="_blank"
                     href="https://nextjs.org/">NextJs</a>
                  , 什么
                  <a className="text-[#00c16a] font-bold cursor-pointer" target="_blank"
                     href="https://nuxt.com/">NuxtJs</a>
                  , 什么
                  <a className="text-[#ea285a] font-bold cursor-pointer" target="_blank"
                     href="https://nestjs.com/">NestJs</a>
                  ......
                </p>
                <p>而你身边的人, 在考虑啥时候买第二套房子,什么时候生二胎,</p>
                <p>你还在捣鼓你的破代码.</p>
              </>}></Diary>
            <div className="mt-[16px] flex">
              <a className={'w-[50px] cursor-pointer'} href="https://github.com/MC-YCY" target="_blank">
                <GithubSvgIcon></GithubSvgIcon>
              </a>
              <a className={'w-[50px] ml-5 cursor-pointer'} href="https://gitee.com/yin-chunyang"
                 target="_blank">
                <GiteeSvgIcon></GiteeSvgIcon>
              </a>
              <a className={'w-[50px] ml-5 cursor-pointer'}
                 href="https://www.isqqw.com/pcenter?userid=1790&md=tb" target="_blank">
                <IsqqwSvgIcon></IsqqwSvgIcon>
              </a>
              <a className={'w-[50px] ml-5 cursor-pointer'} href="http://47.93.248.11/home"
                 target="_blank">
                <BlogSvgIcon></BlogSvgIcon>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-md mt-8 md:mt-0 aos-init aos-animate max-w-[100%] hidden lg:block">
        <CodeBlock
          className="theme-codeblock shadow-2xl pt-0 pl-1 pb-2"
          language="ts"
          filename="Developer.ts"
          code={`class Developer {
    name: string;
    signature: string;
    skills: string[];
    workExperience: number;
    constructor() {
        this.name = '春秋半夏';
        this.signature = '知其然不知其所以然.'         
        this.skills = [
            'Vue',
            'React'
            'Angular',
            'NestJs',
            'NextJs'
        ];
        const tYear = new Date().getFullYear();
        this.workExperience = tYear - 2021;
    }
}`}
        />
      </div>
    </div>
  </div>
}

const FlowerHero = () => {
  return <>
    <img
      decoding={'async'}
      className={'home-dark-banner w-full h-full object-cover absolute left-0 top-0'}
      src={HuaDark} alt=""></img>
    <img
      decoding={'async'}
      className={'home-light-banner w-full h-full object-cover absolute left-0 top-0'}
      src={HuaLight} alt=""></img>
    <HomeHeroContent></HomeHeroContent>
  </>
}

const CityHero = () => {
  return <>
    <div className={'w-full h-full absolute left-0 top-0'}>
      <div className={'w-full h-full relative'}>
        <div className={'w-full h-full absolute left-0 top-0 dark:bg-[rgba(0,0,0,0.25)]'}></div>
        <motion.img
          src={HeroBannerFc}
          alt=""
          className="w-[15vw] absolute"
          initial={{ x: '100vw', y: '-100vh', opacity: 0 }}
          animate={{ x: '16vw', y: '30vh', opacity: 1 }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
        />
        <img
          decoding={'async'}
          className={'w-full h-full object-cover '}
          src={HeroBanner} alt=""></img>
      </div>
    </div>
  </>
}
const options: { element: ReactNode, banner: string }[] = [
  {
    element: <CityHero></CityHero>,
    banner: HeroBannerThumbnail,
  },
  {
    element: <FlowerHero></FlowerHero>,
    banner: HuaLightThumbnail,
  },
]
export const HomeHero = () => {
  const [selected, setSelected] = useState<{ element: ReactNode, banner: string }>(options[0])
  const [prevKey, setPrevKey] = useState<string | null>(null)
  const handleChange = (item: { element: ReactNode, banner: string }) => {
    if (item.banner !== selected.banner) {
      setPrevKey(selected.banner) // 记录旧的 key，用于叠加显示
      setSelected(item)
    }
  }
  return <div className={'w-full h-screen relative overflow-hidden'}>
    <div className={'w-[46px] absolute right-[12px] bottom-[12px] z-11'}>
      {
        options.map((item, index) => {
          let mt = index ? 'mt-[6px]' : ''
          return <div key={item.banner} onClick={() => handleChange(item)}
                      className={cn('w-[46px] h-[46px] cursor-pointer bg-[#000] rounded-[50%]', mt)}>
            <img src={item.banner}
                 className={cn('w-full h-full rounded-[50%] opacity-50 object-cover', selected?.banner === item.banner ? 'opacity-100' : '')}
                 alt="" />
          </div>
        })
      }
    </div>
    {/* 新组件 */}
    <motion.div
      key={selected.banner}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute inset-0 z-10"
    >
      {selected.element}
    </motion.div>

    {/* 旧组件退出动画 */}
    <AnimatePresence>
      {prevKey && (
        <motion.div
          key={prevKey}
          initial={false}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
          onAnimationComplete={() => setPrevKey(null)}
        >
          {options.find(o => o.banner === prevKey)?.element}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}
