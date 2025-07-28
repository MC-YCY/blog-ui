'use client'

import { useEffect, useState } from 'react'
import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import { Autoplay, Grid, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MessageBoard } from '@/types/message-board'
import { Accountability, DiaryWriteButton } from '@/components/pages/diary/diary-wrate-button.tsx'
import { toast } from 'sonner'
import { createMessage, getMessages } from '@/api/messages.api.ts'
import dayjs from 'dayjs'
import { getCardColor } from '@/lib/getCardColor.ts'

export const HomeMessageBoard = () => {
  const [list, setList] = useState<MessageBoard[]>([])
  const [username, setUsername] = useState<string>('')
  const installDefaultList = (res: never[]) => {
    // 确保返回的是数组
    const fetchedList = Array.isArray(res) ? res : []

    // 补充欢迎卡片到8个
    const welcomeCards: MessageBoard[] = []
    const neededCount = 8 - fetchedList.length

    if (neededCount > 0) {
      for (let i = 0; i < neededCount; i++) {
        welcomeCards.push({
          username: '虚位以待',
          content: '知其然不知其所以然',
          date: '2025/7/18',
        })
      }
    }
    // 合并原始数据和补充数据
    setList([...fetchedList, ...welcomeCards])
  }
  const getList = () => {
    installDefaultList([])
    getMessages({
      page: 1,
      limit: 32,
    }).then(resData => {
      installDefaultList(resData.data)
    })
  }
  useEffect(() => {
    getList()
  }, [])
  const onSubmit = async (content: string, setOpen: (arg0: boolean) => void) => {
    if (!(content && content.trim()) || !(username && content.trim())) {
      toast.error('tip', {
        description: '请补充签名、内容',
        action: {
          label: '了解',
          onClick: () => {

          },
        },
        duration: 2000,
      })
      setOpen(true)
      return
    }


    toast('', {
      className: 'max-w-[300px]! flex-wrap! custom-toast',
      description: <Accountability></Accountability>,
      action: {
        label: '提交',
        onClick: async () => {
          await createMessage({ content: content, username: username })
          setOpen(false)
          getList()
        },
      },
      cancel: {
        label: '取消',
        onClick: () => {
          setOpen(false)
        },
      },
      duration: 60000,
    })
  }
  return (
    <Container className={'overflow-x-hidden'}>
      <PartTitle
        title={'一些"留言"'}
        description={'可以留下建议,我会尝试修改'}
        action={<DiaryWriteButton
          onOpenChange={() => setUsername('')}
          onSubmit={onSubmit} date={new Date()} username={
          <input aria-label="输入签名" defaultValue={username}
                 onInput={(e) => setUsername((e.target as HTMLInputElement)?.value)} placeholder={'请输入你的签名'}
                 className={'outline-none border-none text-[14px] w-full'} />
        }>
          留言
        </DiaryWriteButton>}
      />
      <div
        className="h-[370px] xl:h-[500px] lg:h-[500px] md:h-[500px] mt-3 select-none mt-[2px]] xl:mt-[14px] px-[6px] mx-[-16px]">
        <Swiper
          style={{ padding: '10px 10px' }}
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
          {
            list.map((item, idx) => {
              return (
                <SwiperSlide
                  key={`msg-${idx}`}
                  style={{
                    backgroundImage: getCardColor(),
                  }}
                  className={`transition-[all_0.3s_linear] bg-background py-[10px] border rounded-2xl px-4 box-border shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]`}
                >
                  <div className="w-full h-full flex flex-col">
                    <div
                      className="text-foreground line-clamp-10 xl:line-clamp-5 lg:line-clamp-5 md:line-clamp-5 opacity-85">
                      {item.content}
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center">
                        <div
                          style={{ backgroundImage: getCardColor(0.3, 0.4) }}
                          className="rounded-full w-[32px] h-[32px] bg-[rgba(0,0,0,.15)] dark:bg-[rgba(255,255,255,.15)]  shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_6px_rgba(255,255,255,.1)] text-background justify-center flex items-center text-[14px]"
                        >
                          {item.username[0]}
                        </div>
                        <span className="ml-2 font-bold text-[14px]">
                                              {item.username}
                                            </span>
                      </div>
                      <div className="text-[12px] text-foreground opacity-75 mt-2">
                        {dayjs(item.date).format('YYYY/MM/DD HH:mm:ss')}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </Container>
  )
}
