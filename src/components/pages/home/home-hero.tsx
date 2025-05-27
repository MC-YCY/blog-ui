'use client';

import {SignatureGroup} from "@/components/project/signature/signature";
import {Diary} from "@/components/project/diary/diary";
import {IconSunFilled} from "@tabler/icons-react";
import {BlogSvgIcon, GiteeSvgIcon, GithubSvgIcon, IsqqwSvgIcon} from "@/components/project/svg-icons/website";
import {CodeBlock} from "@/components/ui/code-block";
import HuaDark from '@/assets/images/article-banner/hua_dark.png'
import HuaLight from '@/assets/images/article-banner/hua.png'

export const HomeHeroContent = () => {
    return <div className='absolute h-screen flex w-full left-0 z-[10] justify-center items-center pointer-events-none'>
        <div className='container flex flex-col md:flex-row justify-around items-center pointer-events-auto'>
            <div className='flex flex-col items-center md:items-start space-y-4 aos-init aos-animate px-2'>
                <div>
                    <div className='w-[30vw] min-w-[300px]'>
                        <SignatureGroup s2Class={'delay-3000!'}></SignatureGroup>
                    </div>

                    <div className='mt-[24px] cursor-default pl-[8px]'>
                        <Diary
                            className1={'bg-[rgba(255,255,255,.65)] dark:bg-[rgba(0,0,0,.6)]'}
                            className2={'bg-[rgba(255,255,255,.65)] dark:bg-[rgba(0,0,0,.6)]'}
                            title={'春秋半夏'}
                            date={'2025/5/15'}
                            weather={<IconSunFilled width={24} height={24} color={'#ecca2f'}/>}
                            content={<>
                                <p>
                                    一名 <del className='text-[#f56c6c] font-bold'>吹牛</del> 开发工程师，什么都不会，这也不学那也不学。
                                </p>
                                <p>时间轮回, 一年又一年,你还在想着新技术出来了,</p>
                                <p>
                                    继续学习什么
                                    <a className='text-[#0070f3] font-bold cursor-pointer' target='_blank'
                                       href='https://nextjs.org/'>NextJs</a>
                                    , 什么
                                    <a className='text-[#00c16a] font-bold cursor-pointer' target='_blank'
                                       href='https://nuxt.com/'>NuxtJs</a>
                                    , 什么
                                    <a className='text-[#ea285a] font-bold cursor-pointer' target='_blank'
                                       href='https://nestjs.com/'>NestJs</a>
                                    ......
                                </p>
                                <p>而你身边的人, 在考虑啥时候买第二套房子,什么时候生二胎,</p>
                                <p>你还在捣鼓你的破代码.</p>
                            </>}></Diary>
                        <div className='mt-[16px] flex'>
                            <a className={'w-[50px] cursor-pointer'} href='https://github.com/MC-YCY' target='_blank'>
                                <GithubSvgIcon></GithubSvgIcon>
                            </a>
                            <a className={'w-[50px] ml-5 cursor-pointer'} href='https://gitee.com/yin-chunyang'
                               target='_blank'>
                                <GiteeSvgIcon></GiteeSvgIcon>
                            </a>
                            <a className={'w-[50px] ml-5 cursor-pointer'}
                               href='https://www.isqqw.com/pcenter?userid=1790&md=tb' target='_blank'>
                                <IsqqwSvgIcon></IsqqwSvgIcon>
                            </a>
                            <a className={'w-[50px] ml-5 cursor-pointer'} href='http://47.93.248.11/home'
                               target='_blank'>
                                <BlogSvgIcon></BlogSvgIcon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rounded-md mt-8 md:mt-0 aos-init aos-animate max-w-[100%] hidden lg:block'>
                <CodeBlock
                    className='theme-codeblock shadow-2xl pt-0 pl-1 pb-2'
                    language="ts"
                    filename="Developer.ts"
                    code={`class Developer {
    name: string;
    skills: string[];
    age: number;
    constructor() {
        this.name = '春秋半夏';
        this.skills = [
            'Vue',
            'React'
            'Angular',
            'NestJs',
            'NextJs'
        ];
        this.age = new Date().getFullYear() - 2003;  
    }
}
const me = new Developer();`}
                />
            </div>
        </div>
    </div>
}

export const HomeHero = () =>{
    return <div className='w-full h-screen relative overflow-hidden'>
        <img
            className={'home-dark-banner w-full h-full object-cover absolute left-0 top-0'}
            src={HuaDark} alt=''></img>
        <img
            className={'home-light-banner w-full h-full object-cover absolute left-0 top-0'}
            src={HuaLight} alt=''></img>
        <HomeHeroContent></HomeHeroContent>
    </div>
}
