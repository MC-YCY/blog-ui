import { HeroParallax } from '@/components/ui/hero-parallax'
import VueBanner from '@/assets/images/hero/vue.png'
import VueRouterBanner from '@/assets/images/hero/vue-router.png'
import VuePiniaBanner from '@/assets/images/hero/vue-pinia.png'

import ReactBanner from '@/assets/images/hero/react.png'
import ReactRouterBanner from '@/assets/images/hero/react-router.png'
import ReactReduxBanner from '@/assets/images/hero/react-redux.png'

import AngularBanner from '@/assets/images/hero/angular.png'
import NestBanner from '@/assets/images/hero/nest.png'
import NodeBanner from '@/assets/images/hero/nodejs.png'
import ViteBanner from '@/assets/images/hero/vite.png'
import WebpackBanner from '@/assets/images/hero/webpack.png'

import GiteeBanner from '@/assets/images/hero/gitee.png'
import GithubBanner from '@/assets/images/hero/github.png'
import IsqqwBanner from '@/assets/images/hero/isqqw.png'
import IsqqwSelfBanner from '@/assets/images/hero/isqqw_self.png'


import { Button } from '@/components/ui/button.tsx'

import {useNavigate } from 'react-router-dom'

const HeroText = (navigate: any) => {
  return <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 po z-9 pointer-events-none">
    <h1
      className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
      # Hi
    </h1>

    <p className={'mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300'}>
      使用了<span className={'text-primary font-bold'}>React、Tailwindcss、radix-ui</span>搭建的站点。
    </p>

    <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
      <span className={'text-destructive'}>背景墙</span>添加了前端常见框架，和我的一些个人主页<span className={'text-primary font-bold'}>点击它们</span>即可跳转
    </p>
    <div className="mt-6 flex space-x-4 pointer-events-auto cursor-pointer">
      <Button variant='destructive'  onClick={()=>navigate('/posts')}>
        🔥 文章
      </Button>
      <Button onClick={()=>navigate('/resume')}>
        🤔 认识博主
      </Button>
    </div>
  </div>
}

const Hero = ({children}:{children:React.ReactElement}) => {
  const navigate = useNavigate()
  return <HeroParallax products={products} children={HeroText(navigate)} content={children}>
  </HeroParallax>
}
export const products = [
  {
    title: 'Vue',
    link: 'https://cn.vuejs.org/',
    thumbnail: VueBanner,
  },
  {
    title: 'Vue-router.ts',
    link: 'https://router.vuejs.org/zh/',
    thumbnail: VueRouterBanner,
  },
  {
    title: 'Pinia',
    link: 'https://pinia.vuejs.org/zh/',
    thumbnail: VuePiniaBanner,
  },

  {
    title: 'React',
    link: 'https://zh-hans.react.dev/',
    thumbnail: ReactBanner,
  },
  {
    title: 'React-router.ts',
    link: 'https://reactrouter.com/',
    thumbnail: ReactRouterBanner,
  },
  {
    title: 'React-redux',
    link: 'https://react-redux.js.org/',
    thumbnail: ReactReduxBanner,
  },

  {
    title: 'Angular',
    link: 'https://angular.dev/',
    thumbnail: AngularBanner,
  },
  {
    title: 'NestJs',
    link: 'https://nestjs.com/',
    thumbnail: NestBanner,
  },
  {
    title: 'NodeJs',
    link: 'https://nodejs.org/en',
    thumbnail: NodeBanner,
  },
  {
    title: 'Vite',
    link: 'https://cn.vite.dev/',
    thumbnail: ViteBanner,
  },
  {
    title: 'Webpack',
    link: 'https://webpack.js.org/',
    thumbnail: WebpackBanner,
  },

  {
    title: 'Gitee',
    link: 'https://gitee.com/yin-chunyang',
    thumbnail: GiteeBanner,
  },
  {
    title: 'Github',
    link: 'https://github.com/MC-YCY',
    thumbnail: GithubBanner,
  },
  {
    title: 'Isqqw',
    link: 'https://www.isqqw.com/',
    thumbnail: IsqqwBanner,
  },
  {
    title: '我的isqqw主页',
    link: 'https://www.isqqw.com/pcenter?userid=1790&md=tb',
    thumbnail: IsqqwSelfBanner,
  },
]
export default Hero