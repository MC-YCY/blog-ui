'use client'

import { useEffect, useState } from 'react'
import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import { Autoplay, Grid, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MessageBoard } from '@/types/message-board'
import { DiaryWriteButton } from '@/components/pages/diary/diary-wrate-button.tsx'
import { toast } from 'sonner'
import { createMessage, getMessages } from '@/api/messages.api.ts'
import dayjs from 'dayjs'

export const HomeMessageBoard = () => {
  const [list,setList] = useState<MessageBoard[]>([
    {
      content:'内容',
      username:'春秋半夏',
      date:'2025/10/1',
      id:0
    }
  ])
  const [username,setUsername] = useState<string>('')
  const getList = () =>{
    getMessages({
      page:1,
      limit:32
    }).then(res=>{
      setList(res.data);
    })
  }
  useEffect(() => {
    getList()
  },[])
  const onSubmit = async (content: string,setOpen:(arg0:boolean)=>void) => {
    if(!(content && content.trim()) || !(username && content.trim())) {
      toast.error('tip',{
        description:'请补充签名、内容',
        action: {
          label: '了解',
          onClick:()=>{

          }
        },
        duration:2000
      });
      setOpen(true);
      return;
    }
    await createMessage({content:content,username:username});
    setOpen(false);
    getList();
  }
  return (
    <Container>
      <PartTitle
        title={'一些"美妙的语言"'}
        description={'**星###星！@#￥%……&'}
        action={<DiaryWriteButton
          onOpenChange={()=>setUsername('')}
          onSubmit={onSubmit} date={new Date()} username={
          <input aria-label="输入签名" defaultValue={username} onInput={(e)=>setUsername((e.target as HTMLInputElement)?.value)} placeholder={'请输入你的签名'} className={'outline-none border-none text-[14px]'} />
        }>
          留言
        </DiaryWriteButton>}
      />
      <div className="w-full h-[500px] mt-3 xl:mt-6 select-none">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              grid: { rows: 2 },
            },
            768: {
              slidesPerView: 3,
              grid: { rows: 2 },
            },
            1024: {
              slidesPerView: 4,
              grid: { rows: 2 },
            },
          }}
          slidesPerView={1}
          grid={{ rows: 1 }}
          spaceBetween={24}
          pagination={{ clickable: true }}
          scrollbar={{
            hide: false,
            horizontalClass: 'custom-swiper-scrollbar',
          }}
          autoplay={{
            delay: 3000,          // 3秒切换
            disableOnInteraction: false, // 用户操作后不停止
            pauseOnMouseEnter: true,      // 鼠标悬停暂停
          }}
          modules={[Grid, Scrollbar, Autoplay]}
          className="w-full h-full ml-auto mr-auto pb-5!"
        >
          {list.map((item, idx) => (
            <SwiperSlide
              key={`msg-${idx}`}
              className="bg-background border rounded-2xl px-4 py-4 box-border shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_8px_rgba(255,255,255,.1)]"
            >
              <div className="w-full h-full flex flex-col">
                <div className="text-foreground line-clamp-5 opacity-85">
                  {item.content}
                </div>
                <div className="mt-auto">
                  <div className="flex items-center">
                    <div
                      className="rounded-full w-[32px] h-[32px] bg-primary text-background justify-center flex items-center text-[14px]"
                    >
                      {item.username[0]}
                    </div>
                    <span className="ml-2 font-bold text-[14px]">
                                          {item.username}
                                        </span>
                  </div>
                  <div className="text-[14px] text-foreground opacity-75 mt-2">
                    {dayjs(item.date).format("YYYY/MM/DD HH:mm:ss")}
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
