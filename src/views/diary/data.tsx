import { IconSunFilled } from '@tabler/icons-react'

export const defaultData = [
  {
    id:+new Date()+100,
    title: '春秋半夏',
    date: new Date(),
    weather: <IconSunFilled width={24} height={24} color={'#ecca2f'} />,
    content: <div>
      <p>React
        交互式日历组件解析：手势操作与高度可定制的日期选择器，这个React日历组件融合了传统日期选择与现代交互设计，主要提供以下功能：</p>
      <p className={'font-bold'}>动态日期渲染:</p>
      <div className={'ml-4'}>
        <li>鼠标拖拽展开/收起日历</li>
        <li>智能滑动阈值判定（5px容差值）</li>
        <li>平滑过渡动画效果</li>
      </div>
      <p className={'font-bold'}>多维度定制化:</p>
      <div className={'ml-4'}>
        <li>自定义周标题（customWeek）</li>
        <li>日期单元格渲染（customDay）</li>
        <li>动态高度配置（cellHeight）</li>
      </div>
      <p className={'font-bold'}>事件反馈机制:</p>
      <div className={'ml-4'}>
        <li>日期选择回调（onClick）</li>
        <li>数据变化通知（onChange）</li>
        <li>展开状态切换（onToggle）</li>
      </div>
    </div>,
  },
  {
    id:+new Date()+200,
    title: '初识Next.js',
    date: new Date(),
    weather: <IconSunFilled width={24} height={24} color={'#ecca2f'} />,
    content: <div>
      <p>面试了解到的，后期空闲尝试</p>
      <p>Next.js 是一个基于 React 的开源框架，专注于构建现代化的 Web 应用程序。它由 Vercel
        团队开发和维护，提供了开箱即用的功能，简化了 React
        应用的开发流程，尤其适合构建服务端渲染（SSR）、静态生成（SSG）或混合渲染的应用程序。</p>
      <p><b>核心特性</b></p>
      <div className={'ml-4'}>
        <li>服务端渲染（SSR）与静态生成（SSG）</li>
        <li>基于文件系统的路由</li>
        <li>API 路由</li>
        <li>自动代码分割与优化</li>
        <li>开发体验增强</li>
        <li>混合渲染模式</li>
      </div>
      <p><b>适用场景</b></p>
      <div className={'ml-4'}>
        <li>SEO 关键型网站（如博客、电商、新闻站）。</li>
        <li>静态内容站点（文档、营销页面）。</li>
        <li>全栈应用（结合 API 路由实现前后端一体化）。</li>
        <li>高性能 Web 应用（利用 ISR 和优化工具）。</li>
      </div>
    </div>,
  },
]
