'use client'
import { Container } from '@/components/project/container'
import { PartTitle } from '@/components/project/part-title/part-title'
import { Calendar } from '@/components/project/calendar/calendar'
import dayjs from 'dayjs'
import { useEffect, useState, useRef } from 'react'
import {
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
  IconSunFilled,
} from '@tabler/icons-react'
import { Diary } from '@/components/project/diary/diary'
import { useNavigate } from 'react-router-dom'
import { getDiarys, getMonthDiartsCount } from '@/api/diary.api.ts'
import { AnimatePresence, motion } from 'motion/react'
import { dateTableCell } from '@/components/project/calendar/types'
import calendarPreviewMp4 from '@/assets/mp4/calendar.mp4'

export const HomeDiary = () => {
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
  const [current, setCurrent] = useState({
    title: '',
    date: date,
    id: +new Date(),
    content: <>
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
    </>,
  })
  const getDiartsFn = () => {
    getDiarys({
      page: 1,
      limit: 1,
      date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    }).then(res => {
      if (res.data && res.data.length) {
        let item = res.data[0]
        setCurrent({
          id: +new Date(),
          title: item.username,
          date: item.date,
          content: item.content,
        })
      } else {
        setCurrent({
          title: '',
          id: +new Date(),
          date: date,
          content: <>
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
          </>,
        })
      }
    })
  }
  useEffect(() => {
    getDiartsFn()
    getMonthCounts()
  }, [date])
  const clickCalendarItem = (d: { day: number, month: number, year: number }) => {
    let date = new Date(d.year, d.month, d.day)
    setDate(date)
  }
  const onToggle = (flat: boolean) => {
    setOpen(flat)
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
  const navigate = useNavigate()
  const goDiary = () => {
    navigate('/diary')
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
  return <Container>
    <PartTitle title={'随记'} description={'记录一点灵感、想法、故事...'}></PartTitle>
    <div className={'w-full mt-3 xl:mt-6 block xl:flex'}>
      <div className={'w-full xl:w-[420px]'}>
        <div
          className={'bg-background pt-4 pb-2 px-4 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)] rounded-[14px]'}>
          <div className={'flex justify-between h-[30px] items-center pb-4 pt-2 box-border px-6'}>
            <IconSquareRoundedChevronLeftFilled onClick={onPrevMonth} width={24} height={24}
                                                className={'cursor-pointer'}></IconSquareRoundedChevronLeftFilled>
            <div className={'font-bold text-[18px] cursor-pointer select-none'}
                 data-tip={'tip:点击今天'} onClick={onToday}>{dayjs(date).format('YYYY年MM月DD日')}</div>
            <IconSquareRoundedChevronRightFilled onClick={onNextMonth} width={24} height={24}
                                                 className={'cursor-pointer'}></IconSquareRoundedChevronRightFilled>
          </div>
          <Calendar customDay={(record) => customDay(record)} openEvent={true} cellHeight={52} open={open} date={date}
                    firstDayOfWeek={1}
                    onClick={clickCalendarItem} onToggle={onToggle}></Calendar>
        </div>
        <div className={'text-[14px] opacity-80 px-3 pt-4'}>
          <a href="https://gitee.com/yin-chunyang/react-calendar" className={'underline'} target={'_blank'}>
            react日历组件,一个可以上下收起展开的日历,收起展示所在日期一周的信息,展开展示月的信息.
          </a>
          <div className={'mt-4'}>
            <a href={calendarPreviewMp4} className={'underline'} target={'_blank'}>功能预览.mp4</a>
          </div>
        </div>
      </div>
      <div className={'flex-1 ml-0 xl:ml-[40px] mt-4 xl:mt-0'}>
        <AnimatePresence mode="wait">
          <motion.div
            key={date.getDate()+date.getMonth()} // 使用唯一标识驱动动画重播
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Diary
              className1={'min-h-[500px]'}
              className2={'min-h-[500px]'}
              className3={'min-h-[400px] line-clamp-14'}
              title={current.title}
              date={dayjs(current.date).format('YYYY年MM月DD日')}
              weather={<IconSunFilled width={24} height={24} color={'#ecca2f'} />}
              content={current.content}></Diary>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <div className={'flex justify-center mt-[28px]'}>
      <div onClick={goDiary}
           className={'cursor-pointer opacity-55 w-[120px] h-[36px] flex justify-center items-center text-foreground border-[1px] border-foreground rounded-[36px] text-[14px]'}>查看更多
      </div>
    </div>
  </Container>
}