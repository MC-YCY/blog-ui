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

import HeroContent from '../hero-content/index.tsx'

import { Button } from '@/components/ui/button.tsx'

const HeroText = () => {
  return <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 po z-9 pointer-events-none">
    <h1
      className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
      # 欢迎来到 Bug 生产基地！
    </h1>
    <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
      这里没有 KFC 全家桶，但有 <span className="text-blue-500">代码</span>、<span
      className="text-purple-500">吐槽</span> 和 <span className="text-pink-500">脑洞</span>，
      偶尔还能 debug 到怀疑人生
    </p>
    <div className="mt-6 flex space-x-4 pointer-events-auto cursor-pointer">
      <Button variant='destructive'>
        🔥 文章
      </Button>
      <Button>
        🤔 认识博主
      </Button>
    </div>
  </div>
}

const Hero = () => {
  return <HeroParallax products={products} children={HeroText()} content={HeroContent()}>
  </HeroParallax>
}
export const products = [
  {
    title: 'Vue',
    link: 'https://cn.vuejs.org/',
    thumbnail: VueBanner,
  },
  {
    title: 'Vue-router',
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
    title: 'React-router',
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