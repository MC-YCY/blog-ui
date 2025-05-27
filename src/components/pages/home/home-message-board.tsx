'use client'

import { useState } from 'react'
import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import { Grid, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MessageBoard } from '@/types/message-board'

export const HomeMessageBoard = () => {
    const [list] = useState<MessageBoard[]>([])

    return (
        <Container>
            <PartTitle
                title={'一些"美妙的语言"'}
                description={'**星###星！@#￥%……&'}
            />
            <div className="w-full h-[500px] mt-3 xl:mt-6 select-none">
                <Swiper
                        slidesPerView={3}
                        grid={{ rows: 2 }}
                        spaceBetween={24}
                        pagination={{ clickable: true }}
                        scrollbar={{
                            hide: false,
                            horizontalClass: 'custom-swiper-scrollbar',
                        }}
                        modules={[Grid, Scrollbar]}
                        className="w-full h-full ml-auto mr-auto pb-5"
                    >
                        {list.map((item, idx) => (
                            <SwiperSlide
                                key={`msg-${idx}`}
                                className="bg-background border rounded-2xl px-4 py-4 box-border shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_8px_rgba(255,255,255,.1)]"
                            >
                                <div className="w-full h-full flex flex-col">
                                    <div className="text-foreground line-clamp-5 opacity-85">
                                        {item.text}
                                    </div>
                                    <div className="mt-auto">
                                        <div className="flex items-center">
                                            <img
                                                width={32}
                                                height={32}
                                                className="rounded-full object-cover w-[32px] h-[32px]"
                                                src={item.image}
                                                alt={item.name}
                                            />
                                            <span className="ml-2 font-bold text-[14px]">
                                          {item.name}
                                        </span>
                                        </div>
                                        <div className="text-[14px] text-foreground opacity-75 mt-1">
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
            </div>
        </Container>
    )
}
