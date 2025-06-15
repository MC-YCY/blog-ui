'use client'

import { cn } from '@/lib/utils.ts'

const texts: string[] = [
  `作为一名技术爱好者，拥有一个功能完善、美观且高效的个人博客是展示专业能力和分享见解的理想方式。下面我将从用户体验和技术实现角度，解析如何使用 React 和 Tailwind CSS 构建一个令人印象深刻的博客平台。[看ai放屁]`,
  `用来尝试NestJs框架搭建的博客，NestJS 作为一款渐进式 Node.js 框架，凭借其企业级架构设计与开箱即用的生态，成为我开发博客后端服务的核心选择。其模块化设计（@Module）与依赖注入（DI）机制，使得代码分层清晰，结合TypeORM实现数据层高效管理，JWT与Passport模块无缝集成身份认证，保障系统安全。通过@nestjs/swagger自动生成 API 文档，配合Redis缓存与Throttler限流，显著提升接口性能。NestJS 深度整合 TypeScript 的强类型特性，结合class-validator实现请求数据验证，减少潜在错误。无论是基于Express的高并发处理能力，还是通过WebSocket实现实时交互，NestJS 都为博客系统提供了灵活、可维护的架构基础，完美支撑从用户管理到内容发布的全场景需求。`,
  `前端用来尝试一种只提供逻辑的ui组件库，使用到了React、Tailwindcss、Radix UI、Aceternity UI、Vite、TypeScript、Socket.Io`,
]
const cardStyleClassName = 'border-[#e3e8f7] dark:border-[#3d3d3f] border-solid border shadow-[0_0_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_00000050] rounded-2xl'
export const AboutMessage = () => {
  return <div className={cn('mt-[26px] px-[20px] md:px-[40px] py-[20px] cursor-default', cardStyleClassName)}>
    <div className={'text-[14px] text-foreground cursor-default h-[21]'}>心路历程</div>
    <div className={'text-[24px] text-foreground font-bold cursor-default h-[36px] mt-[10px]'}>为什么建站？</div>
    <div className={'text-foreground text-[14px] leading-[32px] indent-[2em]'}>
      {
        texts.map((text) => {
          return <p className={'mt-[18px]'}>{text}</p>
        })
      }
    </div>
  </div>
}