'use client';

import {PartTitle} from "@/components/project/part-title/part-title";
import {Container} from "@/components/project/container";
import {
    IconSquareRoundedChevronLeftFilled,
    IconSquareRoundedChevronRightFilled,
    IconSunFilled
} from "@tabler/icons-react";
import dayjs from "dayjs";
import {Calendar} from "@/components/project/calendar/calendar";
import {Diary} from "@/components/project/diary/diary";
import {useEffect, useState, useRef} from "react";
import {EffectCards} from 'swiper/modules';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {DiaryWriteButton} from "@/components/pages/diary/diary-wrate-button";
import {DiaryType} from "@/types/diary";

const DiarySwiper = ({setCurrent}: { setCurrent: (current: DiaryType) => void }) => {
    const swiperInstance = useRef<SwiperRef | null>(null);
    const onSlideChange = (swiper: { activeIndex: number }) => {
        setCurrent(list[swiper.activeIndex])
    }
    const [list] = useState<DiaryType[]>([
        {
            title: '春秋半夏',
            date: new Date(),
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'}/>,
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
            </div>
        },
        {
            title: '初识Next.js',
            date: new Date(),
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'}/>,
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
            </div>
        },
    ])
    useEffect(() => {
        setCurrent(list[0]);
    }, [list]);
    return (
        <>
            <Swiper
                ref={swiperInstance}
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                cardsEffect={{perSlideRotate: 2, perSlideOffset: 5, slideShadows: false}}
                onSlideChange={(swiper) => onSlideChange(swiper)}
            >
                {
                    list.map((item, index) => {
                        return <SwiperSlide key={index}
                                            className={'w-full! h-[404px]! bg-background! shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]'}>
                            <Diary
                                className1={'shadow-none py-3!'}
                                className2={'hidden'}
                                title={item.title}
                                date={dayjs(item.date).format('YYYY年MM月DD日')}
                                weather={item.weather}
                                content={
                                    <div className={'line-clamp-8'}>{item.content}</div>
                                }></Diary>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </>
    );
}

const DiaryPage = () => {
    const [open, setOpen] = useState(true);
    const [date, setDate] = useState(new Date());
    const onPrevMonth = () => {
        const newDate = new Date(date);
        if (open) {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setDate(newDate.getDate() - 7);
        }
        setDate(newDate);
    }
    const onNextMonth = () => {
        const newDate = new Date(date);
        if (open) {
            newDate.setMonth(newDate.getMonth() + 1);
        } else {
            newDate.setDate(newDate.getDate() + 7);
        }
        setDate(newDate);
    }
    const onToday = () => {
        setDate(new Date());
    }
    const clickCalendarItem = (d: { day: number, month: number, year: number }) => {
        setDate(new Date(d.year, d.month, d.day));
    }
    useEffect(() => {
        const handleResize = () => {
            setOpen(window.innerWidth > 1280);
        };

        // 立即执行一次以设置初始状态
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [current, setCurrent] = useState<DiaryType>({
        title: '',
        date: new Date(),
        weather: <></>,
        content: <></>
    });
    return <div className={'pt-[64px] overflow-hidden'}>
        <Container>
            <PartTitle title={'灵光一现一些想法'} description={'落魄前端，加班前的幻想...'}
                       action={<DiaryWriteButton date={date}/>}></PartTitle>
            <div className={'w-full mt-3 xl:mt-6 block xl:flex'}>
                <div className={'w-full xl:w-[500px]'}>
                    <div
                        className={'pt-4 pb-2 px-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)] rounded-[14px]'}>
                        <div className={'flex justify-between h-[30px] items-center pb-4 pt-2 box-border px-6'}>
                            <IconSquareRoundedChevronLeftFilled onClick={onPrevMonth} width={24} height={24}
                                                                className={'cursor-pointer'}></IconSquareRoundedChevronLeftFilled>
                            <div className={'font-bold text-[18px] cursor-pointer select-none'}
                                 data-tip={'tip:点击今天'}
                                 onClick={onToday}>{dayjs(date).format('YYYY年MM月DD日')}</div>
                            <IconSquareRoundedChevronRightFilled onClick={onNextMonth} width={24} height={24}
                                                                 className={'cursor-pointer'}></IconSquareRoundedChevronRightFilled>
                        </div>
                        <Calendar cellHeight={52} open={open} date={date} firstDayOfWeek={1}
                                  onClick={clickCalendarItem}></Calendar>
                    </div>
                </div>
                <div className={'flex-1 ml-0 xl:ml-[40px] pt-6 xl:pt-0 pl-[8px] xl:w-0 w-full'}>
                    <DiarySwiper setCurrent={setCurrent}></DiarySwiper>
                </div>
            </div>
            <div className={'pt-8 xl:pt-6 pl-[8px]'}>
                <Diary
                    className1={'min-h-[500px]'}
                    className2={'min-h-[500px]'}
                    className3={'min-h-[400px]'}
                    title={current.title}
                    date={dayjs(current.date).format('YYYY年MM月DD日')}
                    weather={current.weather}
                    content={current.content}></Diary>
            </div>
        </Container>
    </div>
}

export default DiaryPage;