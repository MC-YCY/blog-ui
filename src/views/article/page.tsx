'use client';

import {PartTitle, PartTitleAction} from "@/components/project/part-title/part-title";
import {Article} from "@/components/project/article/article";
import {Container} from "@/components/project/container";
import {useState} from "react";
import {ArticleType} from "@/types/article";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer";
import {SpanButton} from "@/components/ui/button";
import {CodeBlock} from "@/components/ui/code-block";

import BaoZhiBanner from '@/assets/images/article-banner/baozhi.png';
import DongManBanner from '@/assets/images/article-banner/dongman.png';
import huaBanner from '@/assets/images/article-banner/hua.png';

const ArticlePage = () => {
    const [articleList,setArticleList] = useState<ArticleType[]>([
        {
            banner: BaoZhiBanner,
            title: 'React&NestJs博客',
            date: '2025/4/30',
            describe: <>
                <div>用来尝试NestJs框架搭建的博客，NestJS 作为一款渐进式 Node.js 框架，凭借其企业级架构设计与开箱即用的生态，成为我开发博客后端服务的核心选择。其模块化设计（@Module）与依赖注入（DI）机制，使得代码分层清晰，结合TypeORM实现数据层高效管理，JWT与Passport模块无缝集成身份认证，保障系统安全。通过@nestjs/swagger自动生成 API 文档，配合Redis缓存与Throttler限流，显著提升接口性能。NestJS 深度整合 TypeScript 的强类型特性，结合class-validator实现请求数据验证，减少潜在错误。无论是基于Express的高并发处理能力，还是通过WebSocket实现实时交互，NestJS 都为博客系统提供了灵活、可维护的架构基础，完美支撑从用户管理到内容发布的全场景需求。</div>
                <div className={'mt-4'}>前端用来尝试一种只提供逻辑的ui组件库，使用到了React、Tailwindcss、Radix UI、Aceternity UI、Vite、TypeScript、Socket.Io</div>
                <div className={'mt-4 pl-4 border-l-2 border-l-foreground'}>目前流行的 只提供逻辑 的 UI 组件库（也称为Headless UI或逻辑层组件库）越来越受欢迎。这类库专注于提供无样式的核心交互逻辑和可访问性（a11y），将视觉样式的控制权完全交给开发者，特别适合需要深度定制设计系统的项目。</div>
                <div className={'mt-4'}>
                    <li>在线预览    http://47.93.248.11/home</li>
                    <li>博客前端    https://gitee.com/yin-chunyang/blog-ui</li>
                    <li>管理系统前端    https://gitee.com/yin-chunyang/blog-manage</li>
                    <li>后端服务    https://gitee.com/yin-chunyang/blog-service</li>
                </div>
            </>,
            tags: '项目/全栈博客'
        },
        {
            banner: DongManBanner,
            title: '图片标注/echarts',
            date: '2025/5/13',
            describe: <>
                <div>根据图片展示的具体width、height，设置echarts-yAxis、xAxis的max值，模拟逻辑数值为像素。使用echarts-graphic绘制形状和文本等信息，该配置支持拖动位置，我们只需要实现调整大小即可。</div>
                <div className={'mt-4'}>观察图片，一个形状由顶点、形状、删除文字构成，使用echarts-graphic的group分组，将这些信息设为一个组方便操作。</div>
                <div className={'mt-4'}>格式数据，后期添加的图形都将按照这个格式存储，他不会包含顶点、删除文字，只有图形本身</div>
                <div className={'mt-4'}>在线编辑和预览：https://www.isqqw.com/viewer?id=49585</div>
            </>,
            tags: '功能/echarts'
        },
        {
            banner: huaBanner,
            title: '地图标注&图片标注(图片标注echarts回显)',
            date: '2025/5/3',
            describe: <>
                <div>地图标注、图片标注、标注边界判断
                    标注图形有矩形、多边形、圆形、线路
                    可展示图形的面积、线路的长度;
                </div>
                <div>使用简单，你可以这样</div>
                <CodeBlock
                  className='pt-0 pl-1 pb-2 mt-4'
                  language="ts"
                  filename="demo.ts"
                  code={`const initMap = async () => {
  mapInstance.instance = new mars3d.Map("container", config)

  mapInstance.imgLayer = await addImageLayer(mapInstance.instance, {
    name: '防变形图片',
    url: banner,
    center: {lng: 119.031399, lat: 33.597401}, // 你的实际中心点
  })

  installMapMarkerLayer(mapInstance.instance, mapInstance.imgLayer, {
    buttonElement: {
      rectangle: document.querySelector('#mark-buts-1'),
      polygon: document.querySelector('#mark-buts-2'),
      circle: document.querySelector('#mark-buts-3'),
      polyline: document.querySelector('#mark-buts-4'),
    },
    shapeConfig: {
      shapeArea: true,
      polylineLength: true,
    }
  });
  installMapMarkerButton();
  drawEcho(defaultData)
}`}
                />
                <div className={'mt-4'}>需要绘制结束后有个弹窗，或其他操作可以这样</div>
                <div className={'mt-4 pl-4 border-l-2 border-l-foreground'}>图形绘制的回调，会在图形点击、双击、编辑结束、编辑移动中触发，使用时可根据type判断时机</div>
                <CodeBlock
                  className='pt-0 pl-1 pb-2 mt-4'
                  language="ts"
                  filename="demo.ts"
                  code={`const {
  installMapMarkerLayer,
  getResult,
  drawEcho,
  beginRectangle,
  beginPolygon,
  beginCircle,
  beginPolyline,
} = mapMark()

const customShape1 = (event) =>{
  beginRectangle(event,(type, shape, state, props)=>{
console.log('触发时机类型',type);
console.log(shape);   //  图形对象
console.log(state);   //  可根据图形对象修改存储数据
console.log(props);   // 初始化的配置项
  })
}

const customShape2 = (event) =>{
  beginPolygon(event,(type, shape, state, props)=>{
console.log('触发时机类型',type);
console.log(shape);   //  图形对象
console.log(state);   //  可根据图形对象修改存储数据
console.log(props);   // 初始化的配置项
  })
}

const customShape3 = (event) =>{
  beginCircle(event,(type, shape, state, props)=>{
console.log('触发时机类型',type);
console.log(shape);   //  图形对象
console.log(state);   //  可根据图形对象修改存储数据
console.log(props);   // 初始化的配置项
  })
}

const customShape4 = (event) =>{
  beginPolyline(event,(type, shape, state, props)=>{
console.log('触发时机类型',type);
console.log(shape);   //  图形对象
console.log(state);   //  可根据图形对象修改存储数据
console.log(props);   // 初始化的配置项
  })
}`}
                />
            </>,
            tags: '项目/全栈博客'
        },
    ])
    const tabs = [
        {label: '全部', value: 'all'},
        {label: 'Vue', value: 'vue'},
        {label: 'React', value: 'react'},
        {label: 'Echarts', value: 'echarts'},
        {label: 'JavaScript', value: 'js'},
    ]
    const onLoad = () => {
        const n = [...articleList];
        n.length = 3;
        setArticleList([...articleList, ...n])
    }
    const [previewOpen, setPreviewOpen] = useState(false);
    const [current, setCurrent] = useState<ArticleType>({
        banner: '',
        title: '',
        date: '',
        describe: '',
        tags: '',
    });
    const clickItem = (state: ArticleType) => {
        setCurrent(state);
        setPreviewOpen(true);
    }
    return <div className={'pt-[64px] min-h-[calc(100vh-64px)]'}>
        <Container>
            <Drawer open={previewOpen} onClose={() => setPreviewOpen(false)}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle></DrawerTitle>
                        <Article preview={true} {...current}></Article>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose>
                            <SpanButton onClick={() => setPreviewOpen(false)}>关闭</SpanButton>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <PartTitle title={'一些"小作文"'}
                       description={'天天看各种框架比较，看的是瑟瑟发抖...'} action={
                <div className={'max-w-[100%] lg:max-w-[340px] overflow-x-hidden'}>
                    <PartTitleAction tabs={tabs}></PartTitleAction>
                </div>
            }></PartTitle>
            <div className={'mt-3 xl:mt-6'}>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px_20px]">
                    {
                        articleList.map((article, index) => {
                            return <div key={'home-article' + index}>
                                <Article {...article} onClick={(state) => clickItem(state)}></Article>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={'flex justify-center mt-[20px]'}>
                <div onClick={onLoad}
                     className={'cursor-pointer opacity-55 w-[120px] h-[36px] flex justify-center items-center text-foreground border-[1px] border-foreground rounded-[36px] text-[14px]'}>加载更多
                </div>
            </div>
        </Container>
    </div>
}

export default ArticlePage;