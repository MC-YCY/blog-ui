'use client'

import { PartTitle } from '@/components/project/part-title/part-title'
import { Container } from '@/components/project/container'
import {
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
  IconSunFilled,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import { Calendar } from '@/components/project/calendar/calendar'
import { Diary } from '@/components/project/diary/diary'
import { useEffect, useState, useRef } from 'react'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'
import { Accountability, DiaryWriteButton } from '@/components/pages/diary/diary-wrate-button'
import { DiaryType, Diary as DiaryApiType } from '@/types/diary'
import { SmartPagination } from '@/components/ui/pagination-controller.tsx'
import { createDiary, getDiarys, getMonthDiartsCount } from '@/api/diary.api.ts'
import { toast } from 'sonner'
import { defaultData } from '@/views/diary/data.tsx'
import { AnimatePresence, motion } from 'motion/react'
import { dateTableCell } from '@/components/project/calendar/types'

const DiarySwiper = ({ setCurrent, list }: { setCurrent: (current: DiaryType) => void, list: DiaryType[] }) => {
  const swiperInstance = useRef<SwiperRef | null>(null)
  const onSlideChange = (swiper: { activeIndex: number }) => {
    setCurrent(list[swiper.activeIndex])
  }
  useEffect(() => {
    setCurrent(list[0])
  }, [list])
  return (
    <>
      <Swiper
        ref={swiperInstance}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        cardsEffect={{ perSlideRotate: 2, perSlideOffset: 5, slideShadows: false }}
        onSlideChange={(swiper) => onSlideChange(swiper)}
      >
        {
          list.map((item, index) => {
            return <SwiperSlide key={index}
                                className={'w-full! h-[320px]! bg-background! shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)]'}>
              <Diary
                className1={'shadow-none py-3!'}
                className2={'hidden'}
                title={item.title}
                date={dayjs(item.date).format('YYYY年MM月DD日 HH:mm:ss')}
                weather={item.weather}
                content={
                  <div className={'line-clamp-6 min-h-[252px]'}>{item.content}</div>
                }></Diary>
            </SwiperSlide>
          })
        }
      </Swiper>
    </>
  )
}

const DiaryPage = () => {
  const [list, setList] = useState<DiaryType[]>([...defaultData])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [open, setOpen] = useState(true)
  const [date, setDate] = useState(new Date())
  const onPrevMonth = () => {
    const newDate = new Date(date)
    if (open) {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setDate(newDate.getDate() - 7)
    }
    setDate(newDate)
  }
  const onNextMonth = () => {
    const newDate = new Date(date)
    if (open) {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setDate(newDate)
  }
  const onToday = () => {
    setDate(new Date())
  }
  const clickCalendarItem = (d: { day: number, month: number, year: number }) => {
    setDate(new Date(d.year, d.month, d.day))
  }
  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 1280)
    }

    // 立即执行一次以设置初始状态
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const [current, setCurrent] = useState<DiaryType>({
    title: '',
    date: new Date(),
    weather: <></>,
    content: <></>,
  })
  const getList = () => {
    getDiarys({
      page: page,
      limit: 5,
      date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    }).then(res => {
      setTotal(res.total)
      if (res.total) {
        let listMap = res.data.map((item: DiaryApiType) => {
          return {
            title: item.username,
            date: new Date(item.date),
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'} />,
            content: item.content,
            id: item.id,
          }
        })
        setList(listMap)
      } else {
        setList([...defaultData])
      }
    })
  }
  useEffect(() => {
    getList()
  }, [page, date])
  useEffect(() => {
    getMonthCounts()
  }, [date])
  const [username, setUsername] = useState<string>('')
  const onSubmit = async (content: string, setOpen: (arg0: boolean) => void) => {
    if (!(content && content.trim()) || !(username && content.trim())) {
      toast.error('tip', {
        description: '请补充标题、签名、内容',
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
          await createDiary({ content: content, username: username })
          setOpen(false)
          getList()
          recordMonth.current = -1
          getMonthCounts()
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
  const [monthCounts, setMonthCounts] = useState<{ count: number, day: number, month: number }[]>([])
  const recordMonth = useRef<number>(-1)
  const getMonthCounts = () => {
    if (recordMonth.current === date.getMonth()) return
    getMonthDiartsCount({
      date: dayjs(date).format('YYYY-MM'),
    }).then(res => {
      setMonthCounts(res.map((item: any) => {
        return {
          ...item,
          month: date.getMonth(),
        }
      }))
    }).finally(() => {
      recordMonth.current = date.getMonth()
    })
  }
  const customDay = (record: dateTableCell) => {
    let findCount = monthCounts.find((item) => {
      if (item.month === record.month && item.day === record.day) {
        return item
      }
    })
    let count = findCount?.count || 0
    let info = null
    if (count) {
      info = <div
        className={'w-[6px] h-[6px] absolute right-[10px] top-[10px] rounded-[50%] bg-[#425aef] shadow-[0_8px_16px_-4px_#2c2d300c] flex'}>
      </div>
    }
    const baseClassName = `w-full h-full flex items-center justify-center text-[14px] relative select-none`
    if (date.getDate() === record.day && date.getMonth() === record.month) {
      return <div className={`${baseClassName} bg-foreground text-background rounded-[4px]`}>{record.day}{info}</div>
    }
    if (record.status === 1) {
      return <div className={`${baseClassName}`}>{record.day}{info}</div>
    } else {
      return <div className={`${baseClassName} opacity-55`}>{record.day}{info}</div>
    }
  }
  return <div className={'pt-[32px] overflow-hidden'}>
    <Container>
      <PartTitle title={'灵光一现一些想法'} description={'落魄前端，加班前的幻想...'}
                 action={<DiaryWriteButton
                   onOpenChange={() => setUsername('')}
                   onSubmit={onSubmit} date={new Date()} username={
                   <input aria-label="输入签名" defaultValue={username}
                          onInput={(e) => setUsername((e.target as HTMLInputElement)?.value)}
                          placeholder={'请输入标题、签名'}
                          className={'outline-none border-none text-[14px] w-full'} />
                 }>
                   写点什么呢...
                 </DiaryWriteButton>}></PartTitle>
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
            <Calendar customDay={customDay} cellHeight={52} open={open} date={date} firstDayOfWeek={1}
                      onClick={clickCalendarItem}></Calendar>
          </div>
        </div>
        <div className={'flex-1 ml-0 xl:ml-[32px] pt-6 xl:pt-0 xl:w-0 w-full'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={date.getDate() + date.getMonth()} // 使用唯一标识驱动动画重播
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <DiarySwiper list={list} setCurrent={setCurrent}></DiarySwiper>
            </motion.div>
          </AnimatePresence>
          <div className={'mt-6 text-[14px] text-[#ccc] text-center'}>
            <SmartPagination
              current={page}
              total={total}
              pageSize={5}
              onChange={(p) => setPage(p)}
            />
            {total <= 5 && '没有更多了'}
          </div>
        </div>
      </div>
      <div className="pt-8 xl:pt-6 pl-[8px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id} // 使用唯一标识驱动动画重播
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Diary
              className1="min-h-[500px]"
              className2="min-h-[500px]"
              className3="min-h-[400px]"
              title={current.title}
              date={dayjs(current.date).format('YYYY年MM月DD日 HH:mm:ss')}
              weather={current.weather}
              content={current.content}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  </div>
}

export default DiaryPage