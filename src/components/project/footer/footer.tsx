'use client';

import {IconBrandGithub, IconBrandNextjs, IconBrandReact, IconBrandTailwind} from "@tabler/icons-react";

export const Footer = () => {
    return <div className={'bg-[#000] mt-20'}>
        <div className={'max-w-[100rem] mx-auto py-10 px-2 md:px-8'}>
            <div className={'flex gap-10 flex-wrap'}>
                <a className={'text-[#fff] cursor-pointer'} target={'_blank'} href={'https://nextjs.org/'}>
                    <IconBrandNextjs></IconBrandNextjs>
                </a>
                <a className={'text-[#fff] cursor-pointer'} target={'_blank'} href={'https://react.dev/'}>
                    <IconBrandReact></IconBrandReact>
                </a>
                <a className={'text-[#fff] cursor-pointer'} target={'_blank'} href={'https://tailwindcss.com/'}>
                    <IconBrandTailwind></IconBrandTailwind>
                </a>
                <a className={'text-[#fff] cursor-pointer'} target='_blank' rel='noreferrer' href={'https://github.com/MC-YCY/next-blog'}>
                    <IconBrandGithub></IconBrandGithub>
                </a>
            </div>
        </div>
    </div>
}